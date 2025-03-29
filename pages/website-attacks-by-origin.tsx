import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Dos, DosInline } from "../components/code";
import { LinkedReference, Reference } from "../components/links";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

import codeStyles from "../components/code.module.css";
import barStyles from "../components/percent-bars.module.css";
import miscStyles from "../components/misc.module.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = codeStyles;

export default StaticHtml;

export const meta = {
  title: "Attacks on my website by country of origin",
  date: "2021-04-07",
  description:
    "Attacks on my website by country of origin, distilled from my server logs",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        I just migrated my humble website from Wordpress to a new platform
        (Next.js) and switched to hosting it on my Linux home server. I intended
        my first post after this change to be about my reasons and the
        technology used (and I <em>will</em> write about that). But I just
        gained some baffling insights about the traffic to my website, and I'd
        like to share my findings, since this might be of general interest. In
        particular, it would be interesting how my statistics compare to those
        of other people with an web server on a static IP address.
      </p>
      <p>
        My website has Google Analytics, a standard way of monitoring how much
        interest it gains. But the surprises where elsewhere: in the access log
        of my web server. That log consists of many lines like the following,
        which happens to be caused by a bot accessing one of my posts:
      </p>
      <Dos>
        {String.raw`158.69.243.108 - - [28/Mar/2021:21:03:32 +0200] "GET /foray-physics/ HTTP/1.1" 301 169 "-" "Mozilla/5.0 (compatible; MJ12bot/v1.4.8; http://mj12bot.com/)"`}
      </Dos>
      <p>
        First in the line comes the IP address of the requester. Later in the
        line we see, among other things, the <em>HTTP verb</em>, which is{" "}
        <DosInline>GET</DosInline> here, followed by the relative URL of my
        post, <DosInline>/foray-physics/</DosInline> and some more information.
      </p>
      <p>
        The first thing that struck me is that my HTTP server log (which covers
        the last 12 months) is gargantuan. It's much bigger than my Google
        Analytics suggests for the time span of one year. So what is all this
        traffic not picked up by Google Analytics?
      </p>
      <p>
        The second thing that struck me is the log contains a considerable share
        of <DosInline>POST</DosInline> requests. That is, requests as in the
        line below, where the HTTP verb is <DosInline>POST</DosInline>.
      </p>
      <Dos>
        {String.raw`167.71.39.101 - - [28/Mar/2021:21:42:11 +0200] "POST /_ignition/execute-solution HTTP/1.1" 301 169 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:78.0) Gecko/20100101 Firefox/78.0"`}
      </Dos>
      <p>This instantly raises red flags:</p>
      <ul>
        <li>
          My website is pure <em>static</em> and works without POST request.
          (Its Wordpress predecessor allowed POSTs for an administrator, but
          that was only me, and I filtered myself from the server log. )
        </li>
        <li>
          The URL in the above request (and many others) has nothing to do with
          my blog.
        </li>
        <li>
          POST request are unlikely to happen by accident, since standard
          browser access of an URL creates a GET. Only willfully sending data
          creates a POST.
        </li>
      </ul>
      <p>
        So such POST requests are at best accidental malpractice, at worst
        attempted attacks. Seeing so many POSTs, I got curious about the
        demographics of the malpractitioners.
      </p>
      <p>
        <em>
          Remark: POSTs are not the only candidate signal for malpractice, for
          example:
          <ul>
            <li>
              A GET to an URL unrelated to the website can be an attacker
              sniffing around. (Indeed, there are many sniffing GETs in my
              server log, for example to non-existing login or admin pages.) But
              it is hard to mechanically distinguish intentional bad GETs from
              accidental ones.
            </li>
            <li>
              Besides POST there are more HTTP verbs for write access, for
              example PUT and DELETE. But HTTP verbs other than GET and POST
              turned out very rare in my server log.
            </li>
          </ul>
          So I'll focus on POSTs.
        </em>
      </p>
      <p>
        My server log contains are around 14554 POSTs from Chinese IP addresses,
        2117 POSTs from Russian IP addresses, and so on. The relative shares are
        in the figure below.
      </p>
      <table width="100%">
        <caption className={miscStyles["caption"]}>
          <em>HTTP POSTs to my website by country of origin</em>
        </caption>
        <AbsoluteBar country="China" />
        <AbsoluteBar country="Russia" />
        <AbsoluteBar country="US" />
        <AbsoluteBar country="Romania" />
        <AbsoluteBar country="South Korea" />
        <AbsoluteBar country="Hong Kong" />
        <AbsoluteBar country="Germany" />
      </table>
      <p>To determine the country of an IP address, I used the command</p>
      <Dos>{String.raw`whois <IP address>`}</Dos>
      <p>
        on Linux. Its output contains a country code (<DosInline>CN</DosInline>{" "}
        for China, <DosInline>RU</DosInline> for Russia, and so on). For
        completeness, I must say that in 1447 cases I got the country code{" "}
        <DosInline>EU # Country is really world wide</DosInline> which can mean
        a number of countries including Russia, as I found out with the command
      </p>
      <Dos>{String.raw`curl ipinfo.io/<IP address>/country`}</Dos>
      <p>
        I left that EU country code out of the statistics to avoid muddying the
        waters. (The reason why I did not always use "ipinfo.io" instead of{" "}
        <DosInline>whois</DosInline> is that the "ipinfo.io" server has a daily
        request limit.)
      </p>
      <p>
        I am surprised by the appearance of Romania and South Korea. And by the
        absence of the population giant India, in particular since quite a few
        people from there download my computer science lectures.
      </p>
      <p>
        The above figures might be unfair to countries with large populations,
        since more people are likely to commit more mischief. To address this
        issue, I made the following chart, which ranks the above countries by
        POSTs in my log per 100000 people. (Yes, one can do such statistics for
        other things than Corona.)
      </p>
      <table width="100%">
        <caption className={miscStyles["caption"]}>
          <em>HTTP POSTs to my website per 100000 people</em>
        </caption>
        <RelativeBar country="Hong Kong" />
        <RelativeBar country="Romania" />
        <RelativeBar country="Russia" />
        <RelativeBar country="South Korea" />
        <RelativeBar country="China" />
        <RelativeBar country="Germany" />
        <RelativeBar country="US" />
      </table>
      <p>
        So, as far as my website is concerned, there is remarkably much
        malpractice per capita from Hong Kong and Romania. I don't know why.
        Maybe each country just has some particularly active script kiddies who
        ran into my IP address. Maybe there are systemic reason.
      </p>
      <p>
        So, dear reader, what do you think of this? Do you also have some
        figures? For any feedback, please reply to my corresponding post on
        Twitter:
      </p>
      <LinkedReference target="https://twitter.com/kakimena">
        Carsten Führmann on Twitter
      </LinkedReference>
      <p>Or email me at</p>
      <Reference>cfuhrmann at gmail dot com</Reference>

      <p>
        <em>
          Remark: I'm currently handcrafting a comment system for my website,
          but I'm not done yet. Therefore, discussion is only Twitter and email
          for now.
        </em>
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};

const linesDict = {
  China: { lines: 14554, population: 1398 },
  Russia: { lines: 2177, population: 144.4 },
  US: { lines: 744, population: 328.2 },
  Romania: { lines: 742, population: 19.41 },
  "South Korea": { lines: 728, population: 51.71 },
  "Hong Kong": { lines: 719, population: 7.507 },
  Germany: { lines: 241, population: 83.02 },
};

function AbsoluteBar(props: { country: keyof typeof linesDict }) {
  const { country } = props;
  const { lines } = linesDict[country];
  const percent = Math.round((100 * lines) / 22480);
  const percentString = `${percent}%`;

  return (
    <tr>
      <td align="right" className={miscStyles["no-wrap"]}>
        {country}
      </td>
      <td width="90%">
        <PercentBar value={percent} />
        {percentString}
      </td>
    </tr>
  );
}

function RelativeBar(props: { country: keyof typeof linesDict }) {
  const { country } = props;
  const { lines, population } = linesDict[country];
  const value = (10 * lines) / population;
  const percent = Math.round(value * 0.08);

  return (
    <tr>
      <td align="right" className={miscStyles["no-wrap"]}>
        {country}
      </td>
      <td width="90%">
        <PercentBar value={percent} />
        {Math.round(value)}
      </td>
    </tr>
  );
}

function PercentBar(props: { value: number }) {
  const { value } = props;
  const width = `width-percent-${value}`;
  return <div className={`w3-grey ${barStyles["bar"]} ${barStyles[width]}`} />;
}
