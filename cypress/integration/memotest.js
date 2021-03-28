
const URL = "http://192.168.0.6:8080";
const NUMERO_CUADROS = 16;

context("memotest", () => {
    before(() => {
        cy.visit(URL);
    });


    describe("juega al memotest", () => {

        it("se asegura que haya un tablero con cuadros", () => {
            cy.get("#tablero").find(".cuadro").should("have.length", NUMERO_CUADROS)
        })

        it("se asegura que los cuadros sean aleatorios", () => {
            let clasesOriginales = [];
            cy.get("#empezar").click().then(()=>{
                cy.get(".cuadro").then( (cuadro) => {
                    cuadro.each(function(i, cuadro){
                        clasesOriginales.push(cuadro.className);
                    })
                })
            })

            let clasesNuevas = [];
            cy.get("#empezar").click().then(()=>{
                cy.get(".cuadro").then( (cuadro) => {
                    cuadro.each(function(i, cuadro){
                        clasesNuevas.push(cuadro.className);
                    })
                })
            })

            cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas);

        })


        describe("resuelve el memotest", () => {
            let mapaDePares, listaDePares;
            it("elige una combinacion erronea", () => {
                cy.get(".cuadro").then((cuadros) => {
                    mapaDePares = obtenerParesDeCuadros(cuadros);
                    listaDePares = Object.values(mapaDePares);
                    
                    listaDePares[0][0].click();
                    listaDePares[1][0].click();

                    cy.get(".oculto").should("have.length", 16)
                })
            })
            
            it("resuelve el memotest", () => {
                
                listaDePares.forEach(function(par, i){
                    setTimeout(() => {
                        par[0].click();
                        par[1].click();
                        console.log(par);
                    }, i * 700)
                    
                    
                    cy.get(".oculto", { timeout: 10000 }).should("have.length", 0);

                    const numeroDeTurnos = NUMERO_CUADROS / 2 + 1;
                    cy.get("#estado").contains("Ganaste! pulsa Reiniciar para volver a jugar");
                    cy.get("#intentos").contains("intentos " + numeroDeTurnos);
                    cy.get("#empezar").contains("Reiniciar")
                    
                })

            
            })
        })

    })
})

function obtenerParesDeCuadros(cuadros){
    const pares = {};

    cuadros.each(function(i, cuadros){
        const claseColor = cuadros.className.replace("cuadro oculto", "");

        if (pares[claseColor]){
            pares[claseColor].push(cuadros)
        }else {
            pares[claseColor] = [cuadros]
        }
    })

    return pares;
}
