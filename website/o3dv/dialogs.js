OV.ShowMessageDialog = function (title, message, subMessage)
{
    let dialog = new OV.ButtonDialog ();
    let contentDiv = dialog.Init (title, [
        {
            name : 'OK',
            onClick () {
                dialog.Hide ();
            }
        }
    ]);
    $('<div>').addClass ('ov_dialog_message').html (message).appendTo (contentDiv);
    if (subMessage !== null) {
        $('<div>').addClass ('ov_dialog_submessage').html ('<i>' + subMessage + '</i>').appendTo (contentDiv);
    }
    dialog.Show ();
    return dialog;
};

OV.ShowListPopup = function (button, items, callbacks)
{
    let popup = new OV.ListPopup ();
    popup.SetCustomResizeHandler (function (modalDiv) {
        let offset = button.offset ();
        let left = offset.left + button.outerWidth (false);
        let bottom = offset.top + button.outerHeight (false);
        modalDiv.offset ({
            left : left,
            top : bottom - modalDiv.outerHeight (true)
        });
    });
    popup.Init ();
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        popup.AddListItem (item, {
            onHoverStart : function () {
                if (callbacks.onHoverStart) {
                    callbacks.onHoverStart (i);
                }
            },
            onHoverStop : function () {
                if (callbacks.onHoverStop) {
                    callbacks.onHoverStop (i);
                }
            },
            onClick : function () {
                popup.Hide ();
                callbacks.onClick (i);
            }
        });
    }
    popup.Show ();
    return popup;
};
