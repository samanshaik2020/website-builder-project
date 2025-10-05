// Types
interface ThreeJSElements {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  particlesMesh: THREE.Points;
}

interface AnimationElements {
  inputModal: HTMLElement;
  loadingScreen: HTMLElement;
  statusText: HTMLElement;
  pageDescription: HTMLTextAreaElement;
}

type Theme = 'modern' | 'minimal' | 'bold' | 'professional' | 'creative' | 'dark';

// Three.js Setup
class ThreeJSBackground {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particlesMesh: THREE.Points;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    this.particlesMesh = this.createParticles();
    this.scene.add(this.particlesMesh);

    this.animate();
    this.setupResizeHandler();
  }

  private createParticles(): THREE.Points {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
    });

    return new THREE.Points(particlesGeometry, particlesMaterial);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    this.particlesMesh.rotation.y += 0.0005;
    this.particlesMesh.rotation.x += 0.0002;
    this.renderer.render(this.scene, this.camera);
  };

  private setupResizeHandler(): void {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}

// Page Builder Manager
class PageBuilderManager {
  private selectedTheme: Theme = 'modern';
  private elements: AnimationElements;
  private threeJS: ThreeJSBackground;

  constructor() {
    this.elements = this.getElements();
    this.threeJS = new ThreeJSBackground(
      document.getElementById('canvas-container') as HTMLElement
    );
    this.init();
  }

  private getElements(): AnimationElements {
    return {
      inputModal: document.getElementById('inputModal') as HTMLElement,
      loadingScreen: document.getElementById('loadingScreen') as HTMLElement,
      statusText: document.querySelector('.status-text') as HTMLElement,
      pageDescription: document.getElementById('pageDescription') as HTMLTextAreaElement,
    };
  }

  private init(): void {
    this.setupThemeSelection();
    this.setupFormSubmission();
    this.animateModalEntrance();
  }

  private setupThemeSelection(): void {
    const themeCards = document.querySelectorAll('.theme-card');

    themeCards.forEach((card) => {
      card.addEventListener('click', () => {
        themeCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedTheme = (card as HTMLElement).dataset.theme as Theme;
      });
    });
  }

  private setupFormSubmission(): void {
    const form = document.getElementById('pageForm') as HTMLFormElement;

    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  private handleFormSubmit(): void {
    const description = this.elements.pageDescription.value;

    if (!description.trim()) {
      return;
    }

    // @ts-ignore - anime.js types
    anime({
      targets: this.elements.inputModal,
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: 400,
      easing: 'easeInQuad',
      complete: () => {
        this.elements.inputModal.classList.add('hidden');
        this.elements.loadingScreen.classList.add('active');
        this.startLoadingAnimation();
      },
    });
  }

  private startLoadingAnimation(): void {
    const statusTexts = [
      'Analyzing your request...',
      `Applying ${this.selectedTheme} theme...`,
      'Generating layout...',
      'Creating components...',
      'Adding styling...',
      'Finalizing design...',
    ];

    let textIndex = 0;

    setInterval(() => {
      textIndex = (textIndex + 1) % statusTexts.length;
      this.elements.statusText.textContent = statusTexts[textIndex];
    }, 2000);

    this.animatePageElements();
  }

  private animatePageElements(): void {
    // @ts-ignore - anime.js types
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800,
    });

    timeline
      .add({
        targets: '.header-block',
        opacity: [0, 1],
        translateY: [-20, 0],
        scale: [0.95, 1],
      })
      .add(
        {
          targets: '.nav-block',
          opacity: [0, 1],
          translateX: [-30, 0],
          scale: [0.9, 1],
        },
        '-=400'
      )
      .add(
        {
          targets: '.hero-block',
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.98, 1],
        },
        '-=400'
      )
      .add(
        {
          targets: '.card-1',
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.9, 1],
        },
        '-=200'
      )
      .add(
        {
          targets: '.card-2',
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.9, 1],
        },
        '-=600'
      )
      .add(
        {
          targets: '.card-3',
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.9, 1],
        },
        '-=600'
      );

    // @ts-ignore - anime.js types
    anime({
      targets: '.element',
      scale: [1, 1.01, 1],
      duration: 2000,
      loop: true,
      delay: anime.stagger(200),
      easing: 'easeInOutQuad',
    });

    // @ts-ignore - anime.js types
    anime({
      targets: '.status-bar',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: 400,
      easing: 'easeOutQuad',
    });
  }

  private animateModalEntrance(): void {
    // @ts-ignore - anime.js types
    anime({
      targets: this.elements.inputModal,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 600,
      easing: 'easeOutQuad',
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PageBuilderManager();
  });
} else {
  new PageBuilderManager();
}

// Export for module usage
export { PageBuilderManager, ThreeJSBackground, Theme };