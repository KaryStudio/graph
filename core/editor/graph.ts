
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

/// <reference path="dot/dot.ts" />
/// <reference path="../ui/view.ts" /> 
/// <reference path="../constants.ts" />

module KaryGraph {

    //
    // ─── CREATE NODE ────────────────────────────────────────────────────────────────
    //

        export function CreateNode ( x: number, y: number ) {
            var circle = new Dot( x, y );
            Graph.push( circle ); 
        }

    //
    // ─── GENERATE RANDOM NODES ──────────────────────────────────────────────────────
    //

        /** Generates some random nodes on the screen */
        export function GenerateSomeRandomNodes( howManyNodes: number ) {
            for ( var counter = 0; counter < howManyNodes; counter++ ) {
                var x: number = GenerateRandomCoordinations( GraphWidth );
                var y: number = GenerateRandomCoordinations( GraphHeight );
            }   
        }

        /** Generates a random screen cordinates */
        function GenerateRandomCoordinations ( input: number ) {
            input /= 2;
		    return ( input / 2 ) + ( Math.floor( Math.random( ) * input ) ) - 30;
        }

    // ────────────────────────────────────────────────────────────────────────────────
    
} 