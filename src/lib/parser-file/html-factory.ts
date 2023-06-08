import { uploadFile } from './upload-file'
import { utils } from 'xlsx'

export async function htmlFactory() {
    const workbook = await uploadFile()

    return new Promise((resolve) => {
        const html = utils.sheet_to_html(
            workbook.Sheets[workbook.SheetNames[0]],
        )
        const paresHTML = new DOMParser()
        const table = paresHTML
            .parseFromString(html, 'text/html')
            .querySelector('table')
        const tableHTML = table?.outerHTML
        console.log(tableHTML)
        resolve(tableHTML)
    })
}
