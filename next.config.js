const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => ({
  trailingSlash: true,
  reactStrictMode: true,
  ...(phase === PHASE_DEVELOPMENT_SERVER
    ? {}
    : {
        async headers() {
          const unsafeInline = [
            {
              key: "content-security-policy",
              value:
                "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' www.googletagmanager.com; connect-src 'self' www.google-analytics.com;",
            },
          ];
          return [
            {
              source: "/:path*/",
              headers: [
                {
                  key: "content-security-policy",
                  value:
                    "default-src 'self'; script-src 'self' www.googletagmanager.com; connect-src 'self' www.google-analytics.com;",
                },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
              ],
            },
            {
              source: "/foray-physics/",
              headers: unsafeInline,
            },
            {
              source: "/parametric-oscillator/",
              headers: unsafeInline,
            },
            {
              source: "/review-infinite-resource/",
              headers: [
                {
                  key: "content-security-policy",
                  value:
                    "default-src 'self'; script-src 'self' www.googletagmanager.com; connect-src 'self' www.google-analytics.com; img-src 'self' rameznaam.com",
                },
              ],
            },
          ];
        },
      }),
});
