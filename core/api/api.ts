
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//


//
// ────────────────────────────────────────────────── I ──────────
//  :::::: G R A P H : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────
//

//
// ─── CREATE DOT ─────────────────────────────────────────────────────────────────
//

    function newdot( ): KaryGraph.Dot {
        return KaryGraph.API.AbstractionLayer.AddNewDot( );
    }

//
// ─── NEW DOT AT ─────────────────────────────────────────────────────────────────
//

    function newdotat( x: number, y: number ) {
        return new KaryGraph.Dot( x , y ); 
    }

//
// ─── NEW DOTS ───────────────────────────────────────────────────────────────────
//

    function newdots( howmuch: number ): Array<KaryGraph.Dot> {
        var dots = new Array<KaryGraph.Dot>( );
        for ( var counter = 0; counter < howmuch; counter++ ) {
            dots.push( KaryGraph.API.AbstractionLayer.AddNewDot( ) );
        }
        return dots;
    }

//
// ─── GETDOT ─────────────────────────────────────────────────────────────────────
//

    function getdot( numberId: number ): KaryGraph.Dot {
        return KaryGraph.API.AbstractionLayer.GetDotByNumberId( numberId );
    }

//
// ─── GET DOTS ───────────────────────────────────────────────────────────────────
//

    function getdots( ...ids: number[ ] ) {
        let result = new Array<KaryGraph.Dot>( );
        ids.forEach( id => {
            result.push( getdot( id ) );
        });
        return result;
    }

//
// ─── CONNECT ────────────────────────────────────────────────────────────────────
//

    function connect( ...a: any[ ] ): boolean {
        if ( a.length < 2 ) return false;
        var dots: KaryGraph.Dot[ ] = [ ];
        a.forEach ( b => {
            if ( typeof b == "number" ) {
                dots.push( getdot( b ) );
            } else {
                dots.push( b );
            }
        });
        for ( var i = 1; i < dots.length; i++ ) {
            var success = dots[ i - 1 ].ConnectTo( dots[ i ] );
            if ( !success ) return false;
        }
        return true;
    }

//
// ─── CONNECT AS FAN ─────────────────────────────────────────────────────────────
//

    function fan( ...a: any[ ] ): boolean {
        if ( a.length < 2 ) return false;
        var dots: KaryGraph.Dot[ ] = [ ];
        a.forEach ( b => {
            if ( typeof b == "number" ) {
                dots.push( getdot( b ) );
            } else {
                dots.push( b );
            }
        });
        for ( var i = 1; i < dots.length; i++ ) {
            var success = dots[ 0 ].ConnectTo( dots[ i ] );
            if ( !success ) return false;
        }
        return true;
    }

//
// ─── DISCONNECT ─────────────────────────────────────────────────────────────────
//

    function disconnect( a: any, b: any ): boolean {
        try {
            return a.DisconnectFrom( b );
        } catch ( err ) {
            let d1 = getdot( a );
            let d2 = getdot( b );
            return d1.DisconnectFrom( d2 );
        }
    }

//
// ─── Has Edge ─────────────────────────────────────────────────────────────────
//

      function hasEdge( start : any, end : any ) {
          return getdot( start ).IsConnectedTo( getdot( end ));
      }

//
// ─── CLEAN SCREEN ───────────────────────────────────────────────────────────────
//

    function reset ( ) {
        KaryGraph.API.AbstractionLayer.Reset( );
    }

//
// ─── GET MATRIX OF GRAPH ────────────────────────────────────────────────────────
//

    function matrix ( ): number[][] {
        return KaryGraph.API.AbstractionLayer.CreateMatrix( );
    }

//
// ─── CREATE GRAPH FROM MATRIX ───────────────────────────────────────────────────
//

    function graphfrommatrix ( matrix: number[][] ) {
        var numberOfNodes = matrix.length;
        for ( var i = 0; i < numberOfNodes; i++ ) if ( matrix[ i ].length != numberOfNodes ) {
            // KaryGraph.UI.Console.PrintError( "Invalid matrix." );
            return ;
        }
        var offset = countdots( ) + 1;
        newdots( numberOfNodes );
        for ( var m = 0; m < numberOfNodes; m++ ) {
          for ( var n = 0; n < numberOfNodes; n++ ) {
            if ( matrix[ m ][ n ] == 1 && !hasEdge( m + offset, n + offset ) ) connect( m + offset , n + offset );
          }
        }
    }

//
// ─── GET COUNT OF DOTS ──────────────────────────────────────────────────────────
//

    function countdots( ): number {
        return KaryGraph.API.AbstractionLayer.GetCountOfDots( );
    }

//
// ─── MOVE COMMAND ───────────────────────────────────────────────────────────────
//

    function move( dot: any, x: number, y: number ) {
        try {
            ( <KaryGraph.Dot> dot ).MoveTo( x, y );
        } catch ( err ) {
            dot = getdot( dot );
            dot.MoveTo( x, y );
        }
    }

//
// ─── MOVE TO X ──────────────────────────────────────────────────────────────────
//

    function movex( dot: any, x: number ) {
        try {
            ( <KaryGraph.Dot> dot ).MoveTo( x, ( <KaryGraph.Dot> dot ).Y );
        } catch ( err ) {
            dot = getdot( dot );
            dot.MoveTo( x, dot.Y );
        }
    }

//
// ─── MOVE TO Y ──────────────────────────────────────────────────────────────────
//

    function movey( dot: any, y: number ) {
        try {
            ( <KaryGraph.Dot> dot ).MoveTo( ( <KaryGraph.Dot> dot ).X, y );
        } catch ( err ) {
            dot = getdot( dot );
            dot.MoveTo( dot.X, y );
        }
    }

//
// ─── MOVE BY X ──────────────────────────────────────────────────────────────────
//

    function movebx( dot: any, x: number ) {
        try {
            ( <KaryGraph.Dot> dot ).MoveTo( ( <KaryGraph.Dot> dot ).X + x, ( <KaryGraph.Dot> dot ).Y );
        } catch ( err ) {
            dot = getdot( dot );
            dot.MoveTo( dot.X + x, dot.Y );
        }
    }

//
// ─── MOVE BY Y ──────────────────────────────────────────────────────────────────
//

    function moveby( dot: any, y: number ) {
        try {
            ( <KaryGraph.Dot> dot ).MoveTo( ( <KaryGraph.Dot> dot ).X, ( <KaryGraph.Dot> dot ).Y + y );
        } catch ( err ) {
            dot = getdot( dot );
            dot.MoveTo( dot.X, dot.Y + y );
        }
    }

//
// ─── RENDERING ──────────────────────────────────────────────────────────────────
//

    function render( option: string ) {
        KaryGraph.API.AbstractionLayer.Render( option );
    }

//
// ─── SORT BY INPUTS ─────────────────────────────────────────────────────────────
//

    function sort( ) {
        KaryGraph.API.StandardLibrary.Sortings.Tree( );
    }

//
// ─── GET ORDER OF GRAPH ─────────────────────────────────────────────────────────
//

    function order( ): number {
        return countdots();
    }

//
// ─── GET SIZE OF GRAPH ──────────────────────────────────────────────────────────
//

    function size( ): number {
        var size: number = 0;
        for ( var i = 0; i < countdots(); i++ ) {
            size += getdot(i + 1).NumberOfInputs();
        }
        return size;
    }

//
// ─── GET DEGREE OF VERTEX ───────────────────────────────────────────────────────
//

    function degree( dot: any ): number {
        try {
            return ( <KaryGraph.Dot> dot ).GetDegree();
        } catch ( err ) {
            dot = getdot( dot );
            return dot.GetDegree();
        }
    }

//
// ─── CHECK IF DOTS ARE NEIGHBORS ────────────────────────────────────────────────
//

    function neighbors( a: any, b: any ): boolean {
        try {
            return ( <KaryGraph.Dot> a ).IsConnectedTo( b );
        } catch ( err ) {
            let d1 = getdot( a );
            let d2 = getdot( b );
            return d1.IsConnectedTo( d2 );
        }
    }

//
// ─── GET NEIGHBORHOOD ───────────────────────────────────────────────────────────
//

    function neighborhood( dot: any ): KaryGraph.Dot[] {
        try {
            return ( <KaryGraph.Dot> dot ).GetNeighbors( );
        } catch ( err ) {
            return getdot( dot ).GetNeighbors( );
        }
    }

//
// ─── RESTART SCREEN ─────────────────────────────────────────────────────────────
//

    function cls( ) {
        KaryGraph.UI.Programmer.ClearNotebookScreen( );
    }

// ────────────────────────────────────────────────────────────────────────────────






//
// ──────────────────────────────────────────────────────────────────────── III ──────────
//  :::::: S T A N D A R D   L I B R A R Y : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//

//
// ─── COMLETE GRAPH ──────────────────────────────────────────────────────────────
//

    function completegraph( size: number ) {
        KaryGraph.API.StandardLibrary.CreateCompleteGraph( size );
    }


//
// ─── EULERIAN PATH ? ────────────────────────────────────────────────────────────
//

    function eulerianpath( ): boolean {
        var verticesWithOddDegree = KaryGraph.API.AbstractionLayer.NumberOfOddVertices();
        return (verticesWithOddDegree == 0 || verticesWithOddDegree == 2);
    }

//
// ─── EULERIAN CYCLE ? ───────────────────────────────────────────────────────────
//

    function euleriancycle( ): boolean {
        var verticesWithOddDegree = KaryGraph.API.AbstractionLayer.NumberOfOddVertices( );
        return ( verticesWithOddDegree == 0 );
    }

//
// ─── BFS Without Steps ──────────────────────────────────────────────────────────────
//

    function bfs( start: number ) {
        return KaryGraph.API.StandardLibrary.Algorithms.BFS( getdot( start ), -1 );
    }

// ────────────────────────────────────────────────────────────────────────────────



//
// ──────────────────────────────────────────────── IV ──────────
//  :::::: M A T H : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
//

//
// ─── RND ────────────────────────────────────────────────────────────────────────
//

    function rnd( num: number ): number {
        return KaryGraph.Random( num );
    }

//
// ─── RADIAN ─────────────────────────────────────────────────────────────────────
//

    function radian( num: number ): number {
        return num * ( Math.PI / 180 );
    }

//
// ─── SIN ────────────────────────────────────────────────────────────────────────
//

    function sin( num: number ): number {
        return Math.sin( radian( num ) );
    }

//
// ─── COS ────────────────────────────────────────────────────────────────────────
//

    function cos( num: number ): number {
        return Math.cos( radian( num ) );
    }

// ────────────────────────────────────────────────────────────────────────────────
