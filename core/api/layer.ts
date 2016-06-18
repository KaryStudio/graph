
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

/**
 * This is a very importantn module. It provides an 
 * ***abstraction layer*** over the main `KaryGraph`
 * to create a ***simple functional*** layer over for 
 * the API to reduce complexity when scripting
 */

module KaryGraph.API.AbstractionLayer {

    //
	// ─── ADD NEW DOT ────────────────────────────────────────────────────────────────
	//

        /**
         * Generates a new random dot on the screen
         */
        export function AddNewDot( ): Dot {
            let x = 20 + Random( GraphWidth - 40 );
            let y = 20 + Random( GraphHeight - 40 );
            return NewDotAt( x, y );
        }
        
    //
	// ─── NEW DOT AT ─────────────────────────────────────────────────────────────────
	//

        export function NewDotAt ( x: number, y: number ) {
            let dot = new Dot( x, y );
            Graph[ dot.Id ] = dot;
            return dot;
        }

    //
	// ─── GET DOT BY NUMBER ID ───────────────────────────────────────────────────────
	//

        export function GetDotByNumberId( numberId: number ): Dot {
            let dot: Dot;
            let keys = Object.keys( Graph );
            keys.forEach( key => {
                if ( ( <Dot> Graph[ key ] ).GetNumberId( ) == numberId ) {
                    dot = Graph[ key ];
                    return;
                }
            });
            return dot;
        }

    //
	// ─── CLEAR SCREEN ───────────────────────────────────────────────────────────────
	//

        export function Reset( ) {
            Dot.ResetNumberIdPlace( );
            KaryGraph.UI.Console.Clean( );
            let keys = Object.keys( Graph );
            keys.forEach( key => {
                ( <Dot> Graph[ key ] ).Remove( );
            });
        }

    //
	// ─── COUNT OF DOTS ──────────────────────────────────────────────────────────────
	//

        export function GetCountOfDots( ): number {
            return Object.keys( Graph ).length;
        }

    //
	// ─── RENDERING ──────────────────────────────────────────────────────────────────
	//

        export function Render( text: string ) {
            switch ( text ) {
                case 'circle':
                    Rendering.RenderCircluar();
                default:
                    UI.Console.PrintError(`Graph API: No rendering option ${text}`);
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}