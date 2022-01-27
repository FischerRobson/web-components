class StarRater extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({mode: 'open'});

    shadow.appendChild(this.styles());

    const rater = this.createRater();
    this.stars = this.createStars();

    this.stars.forEach( star => rater.appendChild(star) );

    this.resetRating();

    shadow.appendChild(rater);
  }

  createRater() {
    const rater = document.createElement('div');
    rater.classList.add('star-rater');
    rater.addEventListener('mouseout', this.resetRating.bind(this));
    return rater;
  }

  createStars() {
    const createStar = (_, index) => {
      const star = document.createElement('span');
      star.classList.add('star');
      star.setAttribute('data-value', Number(index) + 1);
      star.innerHTML = '&#9733;'

      star.addEventListener('click', this.setRating.bind(this));
      star.addEventListener('mouseover', this.ratingHover.bind(this));

      return star;
    }

    return Array.from({length: 5}, createStar);
  }

  setRating(event) {
    this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
  }

  ratingHover(event) {
    this.currentRatingValor = event.currentTarget.getAttribute('data-value') || 0;
    this.highlightRating();
  }

  highlightRating() {
    this.stars.forEach( star => {
      const value = star.getAttribute('data-value');
      star.style.color = value <= this.currentRatingValor ? 'yellow' : 'gray'
    });
  }

  resetRating() {
    this.currentRatingValor = this.getAttribute('data-rating');
    this.highlightRating();
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
      .star-rater {

      }

      .star {
        font-size: 5rem;
        color: gray;
        cursor: pointer;
      }
    `
    return style;
  }

}

customElements.define('star-rater', StarRater);