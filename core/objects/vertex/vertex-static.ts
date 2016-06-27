
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

module KaryGraph.VertexStatic {

    //
    // ─── GENERATE VERTEX ID ─────────────────────────────────────────────────────────
    //

        /**
         * Returns the id associated to a vertex in `KaryGraph.Storage.Connections` 
         * by ***Starting*** and ***Ending*** dots of the vertex.
         */
        function GetId ( start: Dot, end: Dot ): string {
            return start.Id + end.Id;
        }

    // ────────────────────────────────────────────────────────────────────────────────

}