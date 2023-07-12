function generateT(dT,z){
    const t = [];
    for(let i = 0; i < z; i++){
        t[i] = i * dT;
    }
    return t;
    }

function gaussianRandom(mean, stdev) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
    }

function generateX(dT, z, initialWealth, a, b){
    const x = [];
    x[0] = initialWealth;
    for(let i = 1; i < z; i++){
        dW = gaussianRandom(mean = 0, stdev = Math.sqrt(dT))
        dX = a * dT + b * dW
        x[i] = x[i -1] + dX
    }
    return x;
}

function graph(dT, z, initialWealth, a, b){
    x = generateX(dT, z, initialWealth)
    t = generateT(dT, z)

    const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      };
}




