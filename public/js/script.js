document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const smallPlants = document.querySelectorAll('.plant-small');
    const featuredPlant = document.querySelector('.featured-section');
    const featuredImg = featuredPlant.querySelector('img');
    const featuredName = featuredPlant.querySelector('.plant-featured-name');
    const featuredDesc = featuredPlant.querySelector('.plant-featured-desc');
    const pauseBtn = document.getElementById('pauseBtn');
    const playBtn = document.getElementById('playBtn');
    
    // Plant data
    const plants = [
        {
            name: "Crassula Ovata",
            description: "Low maintenance succulent with delicate pink or white flowers.",
            image: "/api/placeholder/350/450"
        },
        {
            name: "Haworthiopsis Attenuata",
            description: "Zebra plant with distinctive white tubercles.",
            image: "/api/placeholder/200/150"
        },
        {
            name: "Browningia Hertlingiana",
            description: "Columnar cactus native to South America with beautiful structure.",
            image: "/api/placeholder/200/150"
        },
        {
            name: "Chlorophytum Comosum",
            description: "Spider plant that produces plantlets on long stems for easy propagation.",
            image: "/api/placeholder/200/150"
        },
        {
            name: "Dracaena Trifasciata",
            description: "Snake plant with stiff leaves and excellent air purifying qualities.",
            image: "/api/placeholder/200/150"
        }
    ];
    
    // Set up auto rotation
    let autoRotationInterval;
    let isAutoRotating = true;
    
    // Function to rotate plants
    function rotatePlants() {
        // Get the current featured plant data
        const featuredPlantData = {
            name: featuredName.textContent,
            description: featuredDesc.textContent,
            image: featuredImg.src
        };
        
        // Get the first small plant data
        const firstSmallPlant = smallPlants[0];
        const firstSmallPlantName = firstSmallPlant.querySelector('.plant-small-name').textContent;
        const firstSmallPlantData = plants.find(p => p.name === firstSmallPlantName);
        
        // Update the featured plant with the first small plant data
        featuredImg.src = firstSmallPlantData.image;
        featuredName.textContent = firstSmallPlantData.name;
        featuredDesc.textContent = firstSmallPlantData.description;
        
        // Shift all small plants one position left
        for (let i = 0; i < smallPlants.length - 1; i++) {
            const currentPlant = smallPlants[i];
            const nextPlant = smallPlants[i + 1];
            
            const nextPlantName = nextPlant.querySelector('.plant-small-name').textContent;
            const nextPlantImg = nextPlant.querySelector('img').src;
            
            currentPlant.querySelector('.plant-small-name').textContent = nextPlantName;
            currentPlant.querySelector('img').src = nextPlantImg;
        }
        
        // Update the last small plant with the old featured plant data
        const lastSmallPlant = smallPlants[smallPlants.length - 1];
        lastSmallPlant.querySelector('.plant-small-name').textContent = featuredPlantData.name;
        lastSmallPlant.querySelector('img').src = featuredPlantData.image;
        
        // Add fade effect
        featuredPlant.classList.add('fade-transition');
        smallPlants.forEach(plant => plant.classList.add('fade-transition'));
        
        // Remove fade effect after transition
        setTimeout(() => {
            featuredPlant.classList.remove('fade-transition');
            smallPlants.forEach(plant => plant.classList.remove('fade-transition'));
        }, 500);
    }
    
    // Start auto rotation
    function startAutoRotation() {
        isAutoRotating = true;
        pauseBtn.style.display = 'block';
        playBtn.style.display = 'none';
        autoRotationInterval = setInterval(rotatePlants, 3000); // Rotate every 3 seconds
    }
    
    // Stop auto rotation
    function stopAutoRotation() {
        isAutoRotating = false;
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'block';
        clearInterval(autoRotationInterval);
    }
    
    // Initialize auto rotation
    startAutoRotation();
    
    // Add click events to control buttons
    pauseBtn.addEventListener('click', stopAutoRotation);
    playBtn.addEventListener('click', startAutoRotation);
    
    // Manual click event for small plants
    smallPlants.forEach((plant, index) => {
        plant.addEventListener('click', function() {
            // Stop auto rotation temporarily when user interacts
            if (isAutoRotating) {
                clearInterval(autoRotationInterval);
            }
            
            // Get the current featured plant's data
            const oldFeaturedName = featuredName.textContent;
            const oldFeaturedDesc = featuredDesc.textContent;
            const oldFeaturedImg = featuredImg.src;
            
            // Get the clicked plant's data
            const clickedName = this.querySelector('.plant-small-name').textContent;
            const clickedImg = this.querySelector('img').src;
            const clickedPlantData = plants.find(p => p.name === clickedName);
            
            // Update the featured plant
            featuredImg.src = clickedImg;
            featuredName.textContent = clickedName;
            featuredDesc.textContent = clickedPlantData.description;
            
            // Update the clicked small plant with old featured data
            this.querySelector('img').src = oldFeaturedImg;
            this.querySelector('.plant-small-name').textContent = oldFeaturedName;
            
            // Add animation classes
            featuredPlant.classList.add('fade-transition');
            this.classList.add('fade-transition');
            
            // Remove animation classes after transition
            setTimeout(() => {
                featuredPlant.classList.remove('fade-transition');
                this.classList.remove('fade-transition');
            }, 500);
            
            // Restart auto rotation if it was on
            if (isAutoRotating) {
                autoRotationInterval = setInterval(rotatePlants, 3000);
            }
        });
        
        // Add hover effects
        plant.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        plant.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
});