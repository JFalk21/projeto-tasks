/**
* '/ :([a-zA-Z]+) /'
* '' = para não executar kkk
* () = é um campo de busca
* [] = são as condições
*  + = é pra buscar mais de uma letra
* // = indica um regex
*/

export function buildRoutePath(path) {
    

    const routeParametersRegex = /:([a-zA-Z]+)/g

    


    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)' )

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}