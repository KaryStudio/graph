
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── CREATE DOT ─────────────────────────────────────────────────────────────────
//

    function newdot( ): KaryGraph.Dot {
        return KaryGraph.AbstractionLayer.AddNewDot( );
    }

//
// ─── GETDOT ─────────────────────────────────────────────────────────────────────
//

    function getdot( numberId: number ): KaryGraph.Dot {
        return KaryGraph.AbstractionLayer.GetDotByNumberId( numberId );
    }

//
// ─── CONNECT ────────────────────────────────────────────────────────────────────
//

    function connect( a: any, b: any ) {
        try {
            return a.ConnectTo( b );
        } catch ( err ) {
            let d1 = getdot( a );
            let d2 = getdot( b );
            return d1.ConnectTo( d2 );
        }
    }

//
// ─── DISCONNECT ─────────────────────────────────────────────────────────────────
//

    function disconnect( a: any, b: any ) {
        try {
            return a.DisconnectFrom( b );
        } catch ( err ) {
            let d1 = getdot( a );
            let d2 = getdot( b );
            return d1.DisconnectFrom( b );
        }
    }

//
// ─── CLEAN SCREEN ───────────────────────────────────────────────────────────────
//

    function clean ( ) {
        KaryGraph.AbstractionLayer.ClearScreen( );
    }

// ────────────────────────────────────────────────────────────────────────────────