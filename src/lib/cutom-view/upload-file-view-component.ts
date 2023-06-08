import { AppState } from '../utils'
import * as grapesjs from 'grapesjs'
import { FileComponentName } from '../constants'
import { uploadFile } from '../runner/upload-file/render'
import { bootstrapTable } from '../parser-file/bootstrap-table'

export class UploadFileViewComponent {
    public tables: unknown

    readonly uploadIcon =
        '<svg height="100" viewBox="0 0 1792 1792" width="100" xmlns="http://www.w3.org/2000/svg"><path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"/>&nbsp;<h3> &nbsp; Double to upload file</h3>&nbsp;</svg>'
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string

    public readonly componentType: string
    public readonly model
    public readonly view

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.componentType = this.idFactory(FileComponentName)

        this.model = this.getModel()
        this.view = this.getView()
    }

    getModel() {
        return {
            defaults: {
                tagName: 'div',
                script: uploadFile,
                content: this.uploadIcon,
                droppable: false,
                attributes: {
                    componentType: FileComponentName,
                    style: `
                    background-color:#eaf5f9;
                    width:fit-content;
                    height:fit-content;
                    `,
                },
            },
        }
    }
    getView() {
        return {
            events: {
                dblclick: 'uploadFile',
            },
            uploadFile: async () => {
                this.tables = await bootstrapTable()

                const modelComponent = this.grapesEditor.getSelected()
                modelComponent.components(this.tables)
            },
        }
    }
}
