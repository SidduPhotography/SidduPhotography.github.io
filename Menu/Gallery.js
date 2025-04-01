document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:5000/api/images");
        const data = await response.json();

        if (data.images && data.images.length > 0) {
            const galleryContainer = document.getElementById("gallery-images");

            data.images.forEach((imageUrl) => {
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("gallery-item");

                // Create a loading spinner
                const loader = document.createElement("div");
                loader.classList.add("loader");

                // Create an image element
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Gallery Image";
                img.classList.add("gallery-img");
                img.style.display = "none"; // Hide image until loaded

                // Show image when it's fully loaded
                img.onload = function () {
                    loader.style.display = "none"; // Hide the loader
                    img.style.display = "block"; // Show the image
                };

                // Create a download link
                const downloadLink = document.createElement("a");
                downloadLink.href = imageUrl;
                downloadLink.download = "";
                downloadLink.textContent = "Download";
                downloadLink.classList.add("download-btn");

                // Append loader, image, and download button to the container
                imgContainer.appendChild(loader);
                imgContainer.appendChild(img);
                imgContainer.appendChild(downloadLink);

                // Append to the gallery div
                galleryContainer.appendChild(imgContainer);
            });
        } else {
            document.getElementById("gallery-images").innerHTML = "<p>No images found.</p>";
        }
    } catch (error) {
        console.error("Error loading images:", error);
        document.getElementById("gallery-images").innerHTML = "<p>Failed to load images.</p>";
    }
});
