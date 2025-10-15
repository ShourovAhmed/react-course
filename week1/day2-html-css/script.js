// Modern JavaScript for News Article Interactivity
// ES6+ features: modules, async/await, destructuring, template literals

class NewsInteractivity {
  constructor() {
    this.articles = this.initializeArticles();
    this.searchInput = document.getElementById('search-input');
    this.currentResults = [...this.articles];
    
    this.init();
  }

  // Initialize the interactive features
  init() {
    this.setupSearch();
    this.setupShareButtons();
    this.setupNewsletterForm();
    this.setupReadingProgress();
    this.setupDynamicContent();
    this.setupAccessibilityEnhancements();
    
    console.log('🚀 News site interactivity loaded!');
  }

  // Sample articles data (in real app, this would come from an API)
  initializeArticles() {
    return [
      {
        id: 1,
        title: "Revolutionary AI System Achieves Quantum Computing Breakthrough",
        category: "Technology",
        excerpt: "Scientists at Tech University develop hybrid system that could revolutionize encryption and scientific computing",
        content: "quantum computing artificial intelligence breakthrough research",
        date: "2025-10-15",
        readTime: 5,
        tags: ["AI", "Quantum Computing", "Research"]
      },
      {
        id: 2,
        title: "Next-Gen Quantum Chips Enter Production",
        category: "Technology", 
        excerpt: "Major semiconductor companies announce quantum processor manufacturing plans",
        content: "quantum chips semiconductor manufacturing technology hardware",
        date: "2025-10-14",
        readTime: 3,
        tags: ["Hardware", "Quantum", "Manufacturing"]
      },
      {
        id: 3,
        title: "University AI Research Gets $50M Funding",
        category: "Technology",
        excerpt: "Federal grant will support advanced AI research across multiple institutions",
        content: "artificial intelligence research funding university grant federal",
        date: "2025-10-13", 
        readTime: 4,
        tags: ["AI", "Research", "Funding"]
      },
      {
        id: 4,
        title: "Climate Tech Startups Raise Record Investment",
        category: "Environment",
        excerpt: "Green technology companies attract unprecedented venture capital funding",
        content: "climate technology startups investment green energy sustainability",
        date: "2025-10-12",
        readTime: 6,
        tags: ["Climate", "Startups", "Investment"]
      },
      {
        id: 5,
        title: "Space Mission Discovers Water on Mars",
        category: "Science",
        excerpt: "NASA rover confirms presence of subsurface water in Martian polar regions",
        content: "space mars water nasa rover discovery science exploration",
        date: "2025-10-11",
        readTime: 7,
        tags: ["Space", "Mars", "Discovery"]
      }
    ];
  }

  // Live search functionality
  setupSearch() {
    if (!this.searchInput) return;

    // Create search results container
    this.createSearchResults();

    // Debounced search to improve performance
    let searchTimeout;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value.trim());
      }, 300);
    });

    // Clear search on escape
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });

    // Handle search form submission
    const searchForm = this.searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.performSearch(this.searchInput.value.trim());
      });
    }
  }

  createSearchResults() {
    // Create search results dropdown
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.className = 'search-results';
    resultsContainer.setAttribute('role', 'listbox');
    resultsContainer.setAttribute('aria-label', 'Search results');
    resultsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
    `;

    searchContainer.style.position = 'relative';
    searchContainer.appendChild(resultsContainer);
  }

  performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (query.length === 0) {
      this.hideSearchResults();
      return;
    }

    if (query.length < 2) {
      this.showSearchMessage('Type at least 2 characters to search...');
      return;
    }

    // Filter articles based on query
    const results = this.articles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    this.displaySearchResults(results, query);
  }

  displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (results.length === 0) {
      this.showSearchMessage(`No results found for "${query}"`);
      return;
    }

    const resultsHTML = results.map((article, index) => `
      <div class="search-result-item" 
           role="option" 
           tabindex="0"
           data-article-id="${article.id}"
           style="padding: 1rem; border-bottom: 1px solid #e5e7eb; cursor: pointer;"
           onmouseover="this.style.backgroundColor='#f9fafb'"
           onmouseout="this.style.backgroundColor='white'">
        <div style="display: flex; gap: 1rem;">
          <div style="flex: 1;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem; font-weight: 600; color: #111827;">
              ${this.highlightText(article.title, query)}
            </h4>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.8rem; color: #6b7280; line-height: 1.4;">
              ${this.highlightText(article.excerpt, query)}
            </p>
            <div style="display: flex; gap: 1rem; font-size: 0.75rem; color: #9ca3af;">
              <span>${article.category}</span>
              <span>${article.readTime} min read</span>
              <span>${this.formatDate(article.date)}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    resultsContainer.innerHTML = resultsHTML;
    resultsContainer.style.display = 'block';

    // Add click handlers to results
    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const articleId = item.dataset.articleId;
        this.handleArticleClick(articleId);
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const articleId = item.dataset.articleId;
          this.handleArticleClick(articleId);
        }
      });
    });

    // Update ARIA attributes
    this.searchInput.setAttribute('aria-expanded', 'true');
    this.searchInput.setAttribute('aria-owns', 'search-results');
    
    // Announce results to screen readers
    const announcement = `${results.length} search result${results.length !== 1 ? 's' : ''} found`;
    this.announceToScreenReader(announcement);
  }

  highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: #fef3c7; padding: 0 2px;">$1</mark>');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }

  showSearchMessage(message) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div style="padding: 1rem; text-align: center; color: #6b7280; font-size: 0.9rem;">
        ${message}
      </div>
    `;
    resultsContainer.style.display = 'block';
    this.searchInput.setAttribute('aria-expanded', 'true');
  }

  hideSearchResults() {
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
      this.searchInput.setAttribute('aria-expanded', 'false');
    }
  }

  clearSearch() {
    this.searchInput.value = '';
    this.hideSearchResults();
    this.searchInput.focus();
  }

  handleArticleClick(articleId) {
    // In a real app, this would navigate to the article
    const article = this.articles.find(a => a.id == articleId);
    if (article) {
      this.showNotification(`Opening: ${article.title}`, 'info');
      this.hideSearchResults();
      this.clearSearch();
    }
  }

  // Share functionality
  setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const shareType = this.getShareType(button);
        this.handleShare(shareType);
      });
    });
  }

  getShareType(button) {
    if (button.classList.contains('twitter')) return 'twitter';
    if (button.classList.contains('linkedin')) return 'linkedin';
    if (button.classList.contains('copy')) return 'copy';
    return 'generic';
  }

  async handleShare(type) {
    const title = document.querySelector('.article-title')?.textContent || 'Article';
    const url = window.location.href;

    switch (type) {
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
        this.showNotification('Opening Twitter share...', 'success');
        break;

      case 'linkedin':
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank', 'width=550,height=420');
        this.showNotification('Opening LinkedIn share...', 'success');
        break;

      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          this.showNotification('Link copied to clipboard!', 'success');
        } catch (err) {
          // Fallback for older browsers
          this.fallbackCopyToClipboard(url);
        }
        break;

      default:
        this.showNotification('Share feature activated!', 'info');
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showNotification('Link copied to clipboard!', 'success');
    } catch (err) {
      this.showNotification('Unable to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
  }

  // Newsletter signup
  setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleNewsletterSignup(newsletterForm);
    });
  }

  async handleNewsletterSignup(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const email = emailInput?.value.trim();

    if (!email || !this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      emailInput?.focus();
      return;
    }

    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;

    // Simulate API call
    try {
      await this.simulateAPICall(1500);
      
      // Success
      this.showNotification('Successfully subscribed to newsletter!', 'success');
      emailInput.value = '';
      submitButton.textContent = 'Subscribed ✓';
      
      // Reset button after delay
      setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }, 3000);

    } catch (error) {
      this.showNotification('Subscription failed. Please try again.', 'error');
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Reading progress indicator
  setupReadingProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #2563eb, #3b82f6);
      z-index: 1000;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Calculate and update progress
    const updateProgress = () => {
      const article = document.querySelector('.main-article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const articleBottom = articleTop + articleHeight;
      const windowBottom = scrollTop + windowHeight;

      let progress = 0;
      if (scrollTop >= articleTop) {
        const readableHeight = articleHeight - windowHeight;
        if (readableHeight > 0) {
          progress = Math.min(100, ((scrollTop - articleTop) / readableHeight) * 100);
        } else {
          progress = windowBottom >= articleBottom ? 100 : 0;
        }
      }

      progressBar.style.width = `${Math.max(0, progress)}%`;
    };

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial calculation
    updateProgress();
  }

  // Dynamic content loading
  setupDynamicContent() {
    this.loadRelatedArticles();
    this.setupInfiniteLoading();
  }

  loadRelatedArticles() {
    // This would typically fetch from an API
    const relatedSection = document.querySelector('.related-articles');
    if (!relatedSection) return;

    // Add a "Load More" button
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Load More Articles';
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.style.cssText = `
      width: 100%;
      padding: 1rem;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
      transition: all 0.2s ease;
    `;

    loadMoreBtn.addEventListener('click', () => this.loadMoreArticles(loadMoreBtn));
    loadMoreBtn.addEventListener('mouseover', () => {
      loadMoreBtn.style.backgroundColor = '#e5e7eb';
    });
    loadMoreBtn.addEventListener('mouseout', () => {
      loadMoreBtn.style.backgroundColor = '#f3f4f6';
    });

    relatedSection.appendChild(loadMoreBtn);
  }

  async loadMoreArticles(button) {
    button.textContent = 'Loading...';
    button.disabled = true;

    try {
      // Simulate API call
      await this.simulateAPICall(1000);

      // Add new articles
      const newArticles = [
        {
          title: "Breakthrough in Battery Technology",
          excerpt: "New solid-state batteries promise 10x faster charging",
          date: "2025-10-10",
          image: "https://images.unsplash.com/photo-1609592094571-cffaff83c8b6?w=150&h=100&fit=crop&crop=center"
        },
        {
          title: "AI Helps Detect Cancer Earlier",
          excerpt: "Machine learning models show 95% accuracy in early detection",
          date: "2025-10-09", 
          image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150&h=100&fit=crop&crop=center"
        }
      ];

      const articlesHTML = newArticles.map(article => `
        <article class="related-article" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">
          <img src="${article.image}" alt="Article thumbnail" class="related-image" width="150" height="100">
          <div class="related-content">
            <h3 class="related-title">
              <a href="#">${article.title}</a>
            </h3>
            <p class="related-excerpt">${article.excerpt}</p>
            <time datetime="${article.date}" class="related-date">${this.formatDate(article.date)}</time>
          </div>
        </article>
      `).join('');

      // Insert before the load more button
      button.insertAdjacentHTML('beforebegin', articlesHTML);

      // Animate in new articles
      const newArticleElements = button.parentElement.querySelectorAll('.related-article[style*="opacity: 0"]');
      newArticleElements.forEach((article, index) => {
        setTimeout(() => {
          article.style.opacity = '1';
          article.style.transform = 'translateY(0)';
        }, index * 100);
      });

      button.textContent = 'Load More Articles';
      button.disabled = false;
      this.showNotification('New articles loaded!', 'success');

    } catch (error) {
      button.textContent = 'Load More Articles';
      button.disabled = false;
      this.showNotification('Failed to load articles', 'error');
    }
  }

  setupInfiniteLoading() {
    // Add intersection observer for infinite scroll
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.disabled) {
          // Auto-load when button comes into view
          setTimeout(() => {
            if (entry.target.textContent === 'Load More Articles') {
              entry.target.click();
            }
          }, 500);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(loadMoreBtn);
  }

  // Accessibility enhancements
  setupAccessibilityEnhancements() {
    // Add keyboard navigation for search results
    document.addEventListener('keydown', (e) => {
      const resultsContainer = document.getElementById('search-results');
      if (!resultsContainer || resultsContainer.style.display === 'none') return;

      const results = resultsContainer.querySelectorAll('.search-result-item');
      if (results.length === 0) return;

      let currentIndex = Array.from(results).findIndex(item => 
        item === document.activeElement
      );

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          currentIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
          results[currentIndex].focus();
          break;

        case 'ArrowUp':
          e.preventDefault();
          currentIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
          results[currentIndex].focus();
          break;

        case 'Escape':
          this.hideSearchResults();
          this.searchInput.focus();
          break;
      }
    });

    // Click outside to close search results
    document.addEventListener('click', (e) => {
      const searchContainer = document.querySelector('.search-container');
      if (!searchContainer?.contains(e.target)) {
        this.hideSearchResults();
      }
    });
  }

  // Utility functions
  showNotification(message, type = 'info') {
    // Create notification if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'notification';
      notification.setAttribute('role', 'alert');
      notification.setAttribute('aria-live', 'polite');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      `;
      document.body.appendChild(notification);
    }

    // Set colors based on type
    const colors = {
      success: '#059669',
      error: '#dc2626', 
      warning: '#d97706',
      info: '#2563eb'
    };

    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    notification.style.transform = 'translateX(0)';

    // Auto-hide after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
    }, 3000);
  }

  announceToScreenReader(message) {
    // Create or update screen reader announcement
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
      document.body.appendChild(announcer);
    }

    announcer.textContent = message;
  }

  simulateAPICall(delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the news article page
  if (document.querySelector('.main-article')) {
    window.newsApp = new NewsInteractivity();
  }
});

// Export for potential use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewsInteractivity;
}