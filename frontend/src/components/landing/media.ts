/**
 * Background footage for the landing page, kept in one place so a clip can be
 * swapped or re-ordered without touching component markup.
 */
export const landingMedia = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4",
  /** HLS stream — played through hls.js, natively on Safari. */
  cta: "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8",
} as const;
