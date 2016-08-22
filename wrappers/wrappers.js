
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// To reduce TypeScript's decleration complexities, these wrappers introduce 
// simpler ways to model their functioning. 
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const fs    = require('fs');
    const path  = require('path');

//
// ─── PRISM HIGHLIGHTING WRAPPER ─────────────────────────────────────────────────
//

    function PrismHighlight( code ) {
        return Prism.highlight( code, Prism.languages.javascript );
    }

//
// ─── NODE JS COMMON TOOLS ───────────────────────────────────────────────────────
//

    function JoinPath ( addresses ) {
        let result = '';
        result.forEach( address => {
            result = path.join( result , address );
        });
        return result;
    }

//
// ─── NODE READ FILE ─────────────────────────────────────────────────────────────
//

    function ReadFileSync ( address ) {
        return fs.readFileSync( address, 'utf8' );
    }

//
// ─── GET DIRECTORY ──────────────────────────────────────────────────────────────
//

    function ReadDirSync ( address ) {
        return fs.readDirSync( address );
    }

//
// ─── FS READ FILE ───────────────────────────────────────────────────────────────
//

    function ReadFile ( address, callback ) {
        fs.readFile( address, 'utf8 ', callback );
    }

// ────────────────────────────────────────────────────────────────────────────────