import "highlight.js/styles/a11y-light.css";

import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import { Xml, Dos } from "../components/code";
import { LinkedReference } from "../components/references";

export const meta = {
  title: "Encrypting web configuration sections",
  date: "2012-10-12",
};

export default function Post(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Sections of the web.config file often contain sensitive data, like
        database connection strings with passwords. To keep this information
        from falling in the wrong hands, .NET provides an encryption mechanism,
        which I shall discuss in this post.
      </p>
      <p>
        First, we need to note that this encryption can be reversed by any user
        of the machine on which the encryption took place, provided that user
        has the rights to execute the encryption/decryption tool. In particular,
        we cannot protect the data against administrators on that machine! The
        protection is only against reading the data on other machines, be it
        accidental or on purpose.
      </p>
      <p>Now suppose we have a web.config like this:</p>
      <Xml>
        {String.raw`<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings>
    <add name="MyConnection" connectionString="Data Source=ImportantOracleDatabase;User Id=system;Password=123456" providerName="System.Data.SqlClient" />
  </connectionStrings>
</configuration>`}
      </Xml>
      <p>
        Obviously, we want to protect the password in the connection string. To
        that end, we use the command-line tool “aspnet_regiis”. For .NET 1.1 or
        newer, it resides in the directory “
        {String.raw`%windir%\Microsoft.NET\Framework\<Version>`}” or “
        {String.raw`%windir%\Microsoft.NET\Framework64\<Version>`}”. The “Visual
        Studio Command Prompt” already has the tool in its path. We run the
        command
      </p>
      <Dos>
        aspnet_regiis -pef connectionStrings . -prov
        DataProtectionConfigurationProvider
      </Dos>
      <p>
        from the directory that contains the web.config. Now the file looks like
        this:
      </p>
      <Xml>
        {String.raw`<?xml version="1.0" encoding="utf-8"?>
<configuration>import { LinkedReference } from "../components/references";

  <connectionStrings configProtectionProvider="DataProtectionConfigurationProvider">
    <EncryptedData>
      <CipherData>
        <CipherValue>AQAAANCMnd8BFdERjHoAwE/Cl+sBAAAA6+eWzX1zo0uNXL6TUOrwkgQAAAACAAAAAAADZgAAwAAAABAAAAAK6L73hNSMvKmDNG42cv+hAAAAAASAAACgAAAAEAAAAGYGP4lm0ITbVdmuN/yFt3GQAQAAqXUI7Hmt5w+jMD+Dp+g8zIZqjpMBtuUiUDjEpQGB42MYX+nxPKq0q9N1W4ptG2tHsT96GO96WteMNJjJKPliY7RsOZm04X1XW6yCPgrK3rJ5A5jk9ROX6WU21k5HR2mTlwP9L44hJ5s6xRJqFemB1WxLg463nGocdTDncINmPfOpVmUn+IC5EdtUQWXwfmIao0aEgMgTSSrNuZz3yxesEpIbkf3q6RsqhA1xHnhmXw2Ck0iLlKDixU2KsnBZ7KQ812uztS83dxG7e+IGQA7hC3tVoscwIo3FEObWIw9mYeVE5N6AV+WXCz5ZVaVemVdrI895YlYx/MAEXOYzpNZyGdgT9jWj4lEMmTN/ItzODefuWyfCRlUC7MdskvFDJuA+4YoRtvn4BwLPUKYYqjL5xB2eIk5T3H21W/glggA9e094GKvnCuwg1q3Ois52r215k3KG5Gdx+DpI7NwpiAYBXJ+pjvhw/7w1oDbzc0D+XLidjp9F7Kyk4lYAX5jde1I2wfo08JiW+3In8+FZr8uuthQAAABlGiT73cWMlj88RAMZb92nep44xQ==</CipherValue>
      </CipherData>
    </EncryptedData>
  </connectionStrings>
</configuration>`}
      </Xml>
      <p>
        The option “-pef” tells aspnet_regiis to perform an encryption of some
        configuration section. (The tool has many other options corresponding to
        a wide range of abilities which are of no concern here.) The parameter
        “connectionStrings” is the section to encrypt. The next parameter, the
        dot, is the directory containing the web.config. After the -prov option
        follows the “provider” that performs the encryption. In the above
        example, we chose the “DataProtectionConfigurationProvider”, but there
        are alternatives. Running the command
      </p>
      <Dos>aspnet_regiis -pdf connectionStrings .</Dos>
      <p>
        <em>on the same machine</em> gives us back the original web.config. But
        when we copy the web.config to another machine and run the command
        there, we get an error message.
      </p>
      <p>
        Incidentally, there are also options “-pe” and “-pd” (like the above
        ones but without “f”) which allow the passing of virtual paths instead
        of physical paths. For details, consult the -help option of
        aspnet_regiis.
      </p>
      <p>
        A nice feature of aspnet_regiis is that the encryption/decryption even
        works if the configuration section is a reference to another file, like
        this:
      </p>
      <Xml>
        {String.raw`<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings configSource="connectionStrings.config" />`}
      </Xml>
      <p>
        Here, aspnet_regiis encrypts “connectionStrings.config”, but leaves the
        web.config unchanged.
      </p>
      <p>Configuration sections can also be encrypted from C# code, see e.g.</p>
      <LinkedReference target="https://www.codeproject.com/Articles/20398/Encrypt-and-Decrypt-ConnectionString-in-app-config">
        this article on CODE PROJECT
      </LinkedReference>
      <p>
        Unfortunately, that method fails when we have a reference to another
        file, as in the example above: instead of encrypting
        “connectionStrings.config”, a new file “web.config.config” (!) with
        encrypted content is created. And even after renaming that file back to
        “connectionStrings.config”, I could not make the C# decryption work.
        Without references to files, the C# code worked fine, though.
      </p>
      <p>
        Thanks to Andreas Dosche, Lars Beyer, and Carlos Fernandez Vilas for
        helpful discussions. Also, I used various Microsoft pages, Stack
        Overflow, and the following two references:{" "}
      </p>
      <LinkedReference target="http://www.dotnetprofessional.com/blog/post/2008/03/03/Encrypt-sections-of-WebConfig-or-AppConfig.aspx">
        Article on dotNet Professional
      </LinkedReference>
      <LinkedReference target="http://asheej.blogspot.com/2012/05/how-to-encrypt-and-decrypt-webconfig.html">
        Article on Dotnet Galaxy
      </LinkedReference>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  return { props: { staticHtml } };
};
