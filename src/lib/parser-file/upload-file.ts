import * as XLSX from 'xlsx'

export function uploadFile(): Promise<XLSX.WorkBook> {
    return new Promise((resolve, reject) => {
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = '.xlsx, .csv, .tsv'

        fileInput.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0]
            // factorExtension(file)
            if (file) {
                const reader = new FileReader()

                reader.onload = () => {
                    const fileData = reader.result as ArrayBuffer
                    const workbook = XLSX.read(fileData, { type: 'array' })
                    console.log('uploadFile:###=> \n', workbook)

                    resolve(workbook)
                }

                reader.onerror = () => {
                    reject(new Error('Failed to read file'))
                }

                reader.readAsArrayBuffer(file)
            } else {
                reject(new Error('No file selected'))
            }
        }
        fileInput.click()
    })
}
