export function wait(seconds) {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve(console.log("waited " + seconds + " seconds"));
    }, seconds * 1000);
    
  });
}