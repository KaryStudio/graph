
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

module KaryGraph.UI.Tabs {

    //
    // ─── ENUMS ──────────────────────────────────────────────────────────────────────
    //

        enum ETabs { Editor, Programmer };

    //
    // ─── TABS ON CLICK ──────────────────────────────────────────────────────────────
    //

        export function EditorTabsOnClick ( ) {
            ChangeToTab( ETabs.Editor );
        }

        export function ProgrammerTabsOnClick ( ) {
            ChangeToTab( ETabs.Programmer );
        }

    //
    // ─── CHANGE TO TAB ──────────────────────────────────────────────────────────────
    //

        function ChangeToTab ( tab: ETabs ) {
            let tabContainer = <HTMLDivElement> document.getElementById( TabsContainer );
            let ribbon = <HTMLDivElement> document.getElementById( 'ribbon' );
            switch ( tab ) {
                case ETabs.Editor:
                    tabContainer.className = 'editor-tab';
                    ribbon.className = 'ribbon-editor';
                    break;

                case ETabs.Programmer:
                    tabContainer.className = 'programmer-tab';
                    ribbon.className = 'ribbon-programmer';
                    break;
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}