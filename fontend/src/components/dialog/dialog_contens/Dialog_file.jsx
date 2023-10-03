import './Dialog_file.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon } from '../../../svg/icon';
// import Dialog_content from './dialog_contens/Dialog_contents';
function Dialog_content() {
    return (
        <>
            <Dialog.Title className="DialogTitle">Add image</Dialog.Title>
            <fieldset className="Fieldset">
                <label className="Label" htmlFor="upload-photo">
                    {imgIcon(30, 30)} File/Image
                </label>
                <input type="file" id="upload-photo" />
            </fieldset>
        </>
    );
}

export default Dialog_content;
