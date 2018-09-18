

let scrollY = 0;
const distance = 50;
const speed = 30;
// let distance = document.body.offsetHeight/ 100;

autoScrollTo = (ele) => {
  // calculates the current scroll position
  // from the top of the page in pixels
  let currentY = window.pageYOffset;
  console.log('currentY');
  console.log(currentY);

  // calculates the how many pixels
  // this section is from the top of the page
  let targetY = document.getElementById(ele).offsetTop;
  console.log('targetY');
  console.log(targetY);

  // calculates in pixels the total height
  // to the bottom of the entire site
  let bodyHeight = document.body.offsetHeight;
  console.log('BODY.OFFSETHEIGHT');
  console.log(bodyHeight);

  // calculates the current scroll position + the height of the browser window
  // if this matches the bodyHeight, we will know we're at the bottom of the entire site
  let displayHeight = window.innerHeight;
  let yPos = currentY + window.innerHeight;
  console.log('DISPLAYHEIGHT');
  console.log(displayHeight);
  console.log('INNERHEIGHT');
  console.log(yPos);

  // renders animation
  // let animator = setTimeout('autoScrollTo(\''+ele+'\')', speed);

  let animator = setTimeout('autoScrollTo(\''+ele+'\')', speed);


  if (yPos > bodyHeight) {
    clearTimeout(animator);
  } else {
    if (currentY > targetY - distance) {
      clearTimeout(animator);
    } else {
      scrollY = currentY + distance
      window.scroll(0, scrollY);
    }
  }

}



resetScroller = (ele) => {

}
