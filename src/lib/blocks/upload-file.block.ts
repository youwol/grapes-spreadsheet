import { FileBlockName, FileComponentName } from '../constants'

export class UploadFileBlock {
    public readonly blockType: string
    public readonly label = 'File'
    public readonly content
    // = ` <input type="file" class="form-control" id="excelFile" aria-describedby="inputGroupFileAddon04" aria-label="Upload">`

    public readonly idFactory: (name: string) => string
    public readonly render = ({ el }: { el: HTMLElement }) => {
        // clean the class before
        el.classList.remove(...el.classList)
        el.classList.add('gjs-block', 'fa', 'fa-file-excel')
    }

    constructor(params: { idFactory: (name: string) => string }) {
        Object.assign(this, params)
        this.blockType = this.idFactory(FileBlockName)
        this.content = {
            type: this.idFactory(FileComponentName),
        }
    }
}
