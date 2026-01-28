
export function renderEmail(template, data){

     let output = template;

    for (const key in data) {
    output = output.replaceAll(`{{${key}}}`, data[key]);
  }
  return output;
}