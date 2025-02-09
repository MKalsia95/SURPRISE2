let highestZ = 100; // Start with a high value

class Paper {
    holdingPaper = false;
    prevMouseX = 0;
    prevMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    velocityX = 0;
    velocityY = 0;
    currentPaperX = 0;
    currentPaperY = 0;

    init(paper, zIndex) {
        // Assign initial z-index
        paper.style.zIndex = zIndex;

        paper.addEventListener('mousedown', (e) => {
            this.holdingPaper = true;
            paper.classList.add('dragging');

            // Bring the dragged paper to the top
            highestZ += 1;
            paper.style.zIndex = highestZ;

            if (e.button === 0) { // Left mouse button
                this.prevMouseX = e.clientX;
                this.prevMouseY = e.clientY;
            }
        });

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            if (this.holdingPaper) {
                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
            }
        });

        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            paper.classList.remove('dragging');
        });
    }
}

// Get all paper elements in order
const papers = Array.from(document.querySelectorAll('.paper')).reverse(); // Reverse to start from bottom

papers.forEach((paper, index) => {
    const p = new Paper();
    p.init(paper, highestZ - index); // Assign decreasing z-index
});
