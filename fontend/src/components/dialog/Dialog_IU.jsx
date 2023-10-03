import { useState } from 'react';
import './Dialog_UI.scss';
import * as Dialog from '@radix-ui/react-dialog';
import { imgIcon, closeIcon } from '../../svg/icon';
import Dialog_content from './dialog_contens/Dialog_file';
function Dialog_UI({ openDialog, setOpenDialog }) {
    return (
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay">
                    <Dialog.Content className="DialogContent">
                        {/* custom content here */}
                            <Dialog_content/>
                        {/* ---------------------------------- */}
                          <Dialog.Close asChild>
                            <button className="btn-save">Save changes</button>
                        </Dialog.Close>
                        <Dialog.Close asChild className="closeIcon-btn">
                            {closeIcon(20, 20)}
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Dialog_UI;
