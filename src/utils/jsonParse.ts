const jsonParse = (jsonStr: string): any => {
  let obj: object = [];
  if (!jsonStr) return obj;
  try {
    obj = JSON.parse(jsonStr);
  } catch (e) {
    console.info(
      '::: BasePost/excerptObjGet, JSON.parse Error :::',
      (e as any).toString().slice(0, 128),
      jsonStr
    );
  }
  return obj;
};
export default jsonParse;
