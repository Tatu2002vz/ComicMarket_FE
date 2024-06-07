const postExcel = async (data) => {
  try {
    const formUrl =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfzionYN1RA1H0tOx6duJrRTU5vbkJFfklFqJBTScRHd-QVSg/formResponse";
    const formData = new FormData();
    formData.append("entry.186418094", data.user);
    formData.append("entry.1136450517", data.comicOrChapter);
    formData.append("entry.969337307", data.errorReport);
    formData.append("entry.20816071", data.textError);
    await fetch(formUrl, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.log(e);
  }
};
export default postExcel;
