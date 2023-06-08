import { UploadFileBlock } from './blocks/upload-file.block'
import { UploadFileViewComponent } from './cutom-view/upload-file-view-component'

export function getBlocks() {
    return [UploadFileBlock]
}

export function getComponents() {
    return [UploadFileViewComponent]
}
