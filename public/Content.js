const willSmithImage = "https://i2-prod.hulldailymail.co.uk/incoming/article6873985.ece/ALTERNATES/s615/0_Will-Smith.jpg";

const imgs = document.getElementsByTagName("img");
for (let i = 0; i < imgs.length; i++) {
    imgs[i].src = willSmithImage;
}

const bookmarkButton = document.createElement('button');

bookmarkButton.style.width = '300px';
bookmarkButton.style.height = '40px';
bookmarkButton.style.borderRadius = '24px';
bookmarkButton.style.backgroundColor = 'red';
bookmarkButton.style.borderWidth = '3px';

// Set the button's text content to "Bookmark"
bookmarkButton.textContent = 'BookmarkTheseNuts';

const firstButtonContainer = document.querySelector('.jobs-unified-top-card__content--two-pane');

if (firstButtonContainer) {
    // Append the bookmarkButton as a child of the first element
    firstButtonContainer.appendChild(bookmarkButton);
}