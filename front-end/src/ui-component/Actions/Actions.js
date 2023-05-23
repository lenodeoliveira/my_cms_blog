import { AddBoxOutlined, DeleteOutlineOutlined } from '@material-ui/icons';
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../utils/helpers/AssetsHelpers";
import { ConfirmDialog } from '../Dialog/ConfirmDialog';

function Actions({ onDelete, onCreate, showCreate = true, showCancel = true, length, deleteMessage, intl }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="pr-0 text-right" >
            <div className="btn btn-icon">
                {showCreate ? (
                    <span onClick={onCreate}   >
                        <AddBoxOutlined />
                    </span>
                ) : null}
                {showCancel ? (
                    <button className='btn btn-icon' onClick={() => setOpen(true)} disabled={!length} >
                        <span>
                            <DeleteOutlineOutlined />
                        </span>
                    </button>
                ) : null}
            </div>
            { deleteMessage ? (
                <ConfirmDialog confirm={() => { onDelete(); setOpen(false) }} onClose={() => setOpen(false)} intl={intl} message={deleteMessage} open={open} />
            ) : null}
        </div>
    )
}

export default Actions