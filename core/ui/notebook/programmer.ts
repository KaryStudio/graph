
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

/**
 * This module is responsible for the
 */
module KaryGraph.UI.Programmer {

    //
    // ─── DEFS ───────────────────────────────────────────────────────────────────────
    //

        /** The main notebook view */
        var notebook: HTMLDivElement;

        /** Current prompt */
        var prompt: HTMLDivElement;

        /** Input of the prompt */
        var promptInput: HTMLInputElement;

    //
    // ─── WRAPPERS ───────────────────────────────────────────────────────────────────
    //

        declare function PrismHighlight ( code: string ) : string;

    //
    // ─── INIT NOTEBOOK ──────────────────────────────────────────────────────────────
    //

        /** Starts the notebook view at start. */
        export function INIT ( ) {
            notebook = <HTMLDivElement> document.getElementById( NotebookId );
            ClearScreen( );
            StartPrompt( );
        }

    //
    // ─── RESTART SCREEN ─────────────────────────────────────────────────────────────
    //

        export function ClearNotebookScreen ( ) {
            ClearScreen( );
            StartPrompt( );
        }

    //
    // ─── CLEAR SCREEN ───────────────────────────────────────────────────────────────
    //

        /** Cleans the screen of the notebook and restarts the code of the notebook*/
        function ClearScreen ( ) {
            notebook.innerHTML = '';
        }

    //
    // ─── START PROMPT ───────────────────────────────────────────────────────────────
    //

        /** Initializes a prompt into the notebook */
        function StartPrompt( ) {
            CreateThePrompt( );
            notebook.appendChild( prompt );
        }

    //
    // ─── CREATE PROMPT ──────────────────────────────────────────────────────────────
    //

        /** Creates the corresponding object that presents the prompt. */
        function CreateThePrompt ( ) {
            // Prompt Object
            prompt = document.createElement( 'div' );
            prompt.className = NotebookPromptClass;
            // Prompt Input Object
            promptInput = document.createElement( 'input' );
            promptInput.className = NotebookPromptInputClass;
            promptInput.addEventListener( 'keypress' , OnPromptEnterClicked );
            // Prompt 
            prompt.appendChild( promptInput );
        }
    
    //
    // ─── ON PROMPT ENTER ────────────────────────────────────────────────────────────
    //

        /** Starts when the enter key is pressed on the input  */
        function OnPromptEnterClicked( ev: KeyboardEvent ) {
            // if ( !ev.metaKey ) return;
            let key = ev.which || ev.keyCode;
            if ( key === 13 ) {
                let code = FetchAndResetInput( );
                let result = RunAndGenerateResults( code );
                let html = GenerateResultRowHTML( code , result );
                AppendRow( html );
            }
        }

    //
    // ─── APPEND ROW ─────────────────────────────────────────────────────────────────
    //

        function AppendRow( html: string ) {
            let row = document.createElement('div');
            row.className = NotebookResultRowClass;
            row.innerHTML = html;
            notebook.insertBefore( row , prompt );
        }

    //
    // ─── FETCH AND RESET INPUT VALUE ────────────────────────────────────────────────
    //
        
        /** Fetches and resets the input box value */
        function FetchAndResetInput( ): string {
            let result = promptInput.value;
            promptInput.value = '';
            return result;
        }

    //
    // ─── GENERATE ROW ───────────────────────────────────────────────────────────────
    //

        function GenerateResultRowHTML ( code: string, result: string ): string {
            let highlightedCode = PrismHighlight( code );
            return `<div class="${ NotebookResultCodeClass }">${ highlightedCode }` +
                   `<div class="${ NotebookSayBoxClass }">${ result }</div></div>`;
        }

    //
    // ─── RUN AND GENERATE RESULTS ───────────────────────────────────────────────────
    //

        function RunAndGenerateResults( code: string ) {
            let runResults = KaryGraph.ScriptEngine.Run( code );
            if ( ScriptEngine.RunStatus ) {
                return KaryGraph.UI.Programmer.GenerateSayHTML( runResults );
            } else {
                return `<div class="${ NotebookError }">${ runResults }</div>`
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}