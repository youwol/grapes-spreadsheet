import * as XLSX from 'xlsx'
import { uploadFile } from './upload-file'
import { v4 } from 'uuid'

const divStyle = `  max-height: 30em;
                            overflow: auto;
                            min-width: 85%;
                            background: initial;
                            padding: 5px;
                            margin: 5px;`
const theadStyle = `background-color: #444444 !important;color: #ffbb00!important;position: sticky;top: 0;`

export async function bootstrapTable(): Promise<string> {
    const workbook = await uploadFile()

    return new Promise((resolve) => {
        const containerId = v4().substring(0, 3)

        const uniqueId = v4().substring(0, 3)
        const sheetNames = workbook.SheetNames
        let result = ''
        sheetNames.forEach((sheetName) => {
            let tableRows = ''
            let tableHeader = ''

            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

            data.forEach((obj, index) => {
                let rowCells = ''

                Object.values(obj).forEach((val) => {
                    rowCells += `<td>${val}</td>`
                })

                if (index === 0 && !tableHeader) {
                    tableHeader = `
            <thead style="${theadStyle}">
              <tr>
                ${Object.keys(obj)
                    .map((key) => `<th scope="col">${key}</th>`)
                    .join('')}
              </tr>
            </thead>`
                }

                tableRows += `<tr>${rowCells}</tr>`
            })
            result += `
         <div class="card">
                    <div class="card-header text-center p-0 " id="heading${
                        sheetName + uniqueId
                    }">
                      <h2 class="mb-0">
                        <button class="btn btn-link text-dark" type="button" data-toggle="collapse" data-target="#collapse${
                            sheetName + uniqueId
                        }" aria-expanded="true" aria-controls="collapse${
                sheetName + uniqueId
            }">
                         ${sheetName}
                        </button>
                      </h2>
                    </div>
                
                    <div id="collapse${
                        sheetName + uniqueId
                    }" class="collapse" aria-labelledby="heading${
                sheetName + uniqueId
            }" data-parent="#accordionTable${containerId}">
                      <div class="card-body" style="${divStyle}">                        
                        <table class="table table-striped">
                                  ${tableHeader}
                          <tbody>${tableRows}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
       
      `
        })
        const container = `
                <div class="accordion" id="accordionTable${containerId}">
                 ${result}
              </div>
                  
               
        `

        resolve(container)
    })
}
