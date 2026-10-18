const base = require("./package.json").build;

const updateUrl = process.env.ROTA_UPDATE_URL;
const publisherName = process.env.ROTA_PUBLISHER_NAME;
const certificateSubjectName = process.env.ROTA_CERTIFICATE_SUBJECT_NAME;
const certificateSha1 = process.env.ROTA_CERTIFICATE_SHA1;

if (updateUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(updateUrl);
  } catch {
    throw new Error("ROTA_UPDATE_URL must be a valid HTTPS URL.");
  }
  if (parsedUrl.protocol !== "https:") {
    throw new Error("Rota updates require an HTTPS feed.");
  }
  if (!publisherName?.trim()) {
    throw new Error("ROTA_PUBLISHER_NAME must match the Windows signing certificate subject before enabling updates.");
  }
  if (!(process.env.WIN_CSC_LINK || process.env.CSC_LINK || certificateSubjectName || certificateSha1)) {
    throw new Error("Configure a Windows signing certificate file (WIN_CSC_LINK/CSC_LINK) or certificate-store identity before enabling updates.");
  }
}

module.exports = {
  ...base,
  ...(updateUrl ? {
    publish: [{ provider: "generic", url: updateUrl }],
    win: {
      ...base.win,
      verifyUpdateCodeSignature: true,
      publisherName: [publisherName.trim()],
      ...((certificateSubjectName || certificateSha1) ? {
        signtoolOptions: {
          ...base.win.signtoolOptions,
          ...(certificateSubjectName ? { certificateSubjectName } : {}),
          ...(certificateSha1 ? { certificateSha1 } : {})
        }
      } : {})
    }
  } : {})
};
