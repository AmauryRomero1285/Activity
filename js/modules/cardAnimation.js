const $cardsWrapper = document.querySelector('#cards');
const $cards = document.querySelectorAll('.card__content');

const numCards = $cards.length;
$cardsWrapper.style.setProperty('--numcards', numCards);

const viewTimeline = new ViewTimeline({
  subject: $cardsWrapper,
  axis: 'block',
});

$cards.forEach(($card, index0) => {
  const index = index0 + 1;
  const reverseIndex0 = numCards - index;

  $card.animate(
    {
      transform: [`scale(1)`, `scale(${1 - (0.1 * reverseIndex0)})`],
    },
    {
      timeline: viewTimeline,
      fill: 'forwards',
      rangeStart: `exit-crossing ${index0 / numCards * 100}%`,
      rangeEnd: `exit-crossing ${index / numCards * 100}%`,
    }
  );
});
