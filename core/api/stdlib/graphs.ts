
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

module KaryGraph.API.StandardLibrary {

    //
	// ─── RND ────────────────────────────────────────────────────────────────────────
	//

        export function RND( ) {
            
        }

    //
	// ─── COMPLETE GRAPH ─────────────────────────────────────────────────────────────
	//

        export function CreateCompleteGraph( size: number ) {
            let keys = new Array<string>( );
            // creating dots
            for ( var counter = 0; counter < size; counter++ ) {
                keys.push( API.AbstractionLayer.AddNewDot( ).Id );
            }
            // connecting
            keys.forEach( key => {
                for ( var index = 0; index < size; index++ ) {
                    var cdot = keys[ index ];
                    if ( cdot != Graph[ key ] ) {
                        Graph[ key ].ConnectTo( Graph[ keys[ index] ] );
                    }
                }
            });
        }

    // ────────────────────────────────────────────────────────────────────────────────

}