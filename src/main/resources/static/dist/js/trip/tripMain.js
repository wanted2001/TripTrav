console.log('tripCourse in');

courseCall().then(re => {
    console.log(re);
    const container = document.getElementById('cardContainer');

    re.forEach(result => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = result.firstImage;

        const content = document.createElement("div");
        content.classList.add("card-content");

        const link = document.createElement("a");
        link.href = `/tripdetail=${result.contentId}`;
        link.innerText = result.title;

        content.appendChild(link);
        card.appendChild(image);
        card.appendChild(content);
        container.appendChild(card);
    });
});

async function courseCall() {
    const response = await fetch("/trip/courseCall");
    return await response.json();
}