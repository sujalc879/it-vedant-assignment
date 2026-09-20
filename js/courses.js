/* ==========================================================================
   ClassIQ Courses & Student Dashboard Logic
   AJAX course data retrieval, category filters, search input & enrollment logic
   ========================================================================== */

const MOCK_COURSES = [
  {
    id: 1,
    title: 'Full-Stack Web Development Masterclass',
    category: 'web-dev',
    categoryName: 'Web Development',
    description: 'Master HTML5, CSS3, Modern JavaScript, React, and PHP REST APIs.',
    rating: 4.9,
    students: '12,400',
    duration: '32 Hours',
    badge: 'Bestseller',
    image: 'assets/images/Full-Stack Web Development Masterclass.png'
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning Fundamentals',
    category: 'data-science',
    categoryName: 'Data Science',
    description: 'Learn Python, Pandas, Data Visualization, and predictive models.',
    rating: 4.8,
    students: '8,900',
    duration: '28 Hours',
    badge: 'Popular',
    image: 'assets/images/Data Science & Machine Learning Fundamentals.png'
  },
  {
    id: 3,
    title: 'iOS & Android App Development with Flutter',
    category: 'app-dev',
    categoryName: 'App Development',
    description: 'Build native cross-platform mobile apps for iOS and Android.',
    rating: 4.9,
    students: '6,750',
    duration: '24 Hours',
    badge: 'Top Rated',
    image: 'assets/images/iOS & Android App Development with Flutter.png'
  },
  {
    id: 4,
    title: 'Modern UI/UX Design System Masterclass',
    category: 'ui-ux',
    categoryName: 'UI/UX Design',
    description: 'Design human-centered web & mobile interfaces in Figma.',
    rating: 4.9,
    students: '15,200',
    duration: '20 Hours',
    badge: 'Featured',
    image: 'assets/images/Modern UIUX Design System Masterclass.png'
  },
  {
    id: 5,
    title: 'Advanced AI Prompt Engineering & LLM APIs',
    category: 'data-science',
    categoryName: 'Data Science',
    description: 'Build modern AI agent workflows and integrate cloud APIs.',
    rating: 4.9,
    students: '9,410',
    duration: '18 Hours',
    badge: 'New',
    image: 'assets/images/Advanced AI Prompt Engineering & LLM APIs.png'
  },
  {
    id: 6,
    title: 'Bootstrap 5 & Responsive Web Architecture',
    category: 'web-dev',
    categoryName: 'Web Development',
    description: 'Build sleek, responsive grid layouts with minimal code.',
    rating: 4.7,
    students: '11,100',
    duration: '16 Hours',
    badge: 'Popular',
    image: 'assets/images/Bootstrap 5 & Responsive Web Architecture.png'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const coursesGrid = document.getElementById('courses-grid');
  const searchInput = document.getElementById('course-search-input');
  const filterPills = document.querySelectorAll('.filter-pill');

  let currentCategory = 'all';
  let searchQuery = '';

  // Initial Load Courses
  loadCourses();

  // Search Listener with Debounced Analytics Tracking
  let searchDebounceTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterAndRenderCourses();

      clearTimeout(searchDebounceTimeout);
      searchDebounceTimeout = setTimeout(() => {
        if (searchQuery.length > 1 && typeof trackAnalyticsEvent === 'function') {
          trackAnalyticsEvent('search_courses', { search_term: searchQuery });
        }
      }, 500);
    });
  }

  // Category Filter Listener with Analytics Tracking
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      filterAndRenderCourses();

      if (typeof trackAnalyticsEvent === 'function') {
        trackAnalyticsEvent('select_category_filter', { category: currentCategory });
      }
    });
  });

  async function loadCourses() {
    try {
      const res = await fetch('api/courses.php');
      if (res.ok) {
        const json = await res.json();
        window.allCourses = json.data || MOCK_COURSES;
      } else {
        window.allCourses = MOCK_COURSES;
      }
    } catch (e) {
      window.allCourses = MOCK_COURSES;
    }
    filterAndRenderCourses();
  }

  function filterAndRenderCourses() {
    if (!coursesGrid) return;
    const courses = window.allCourses || MOCK_COURSES;

    const filtered = courses.filter(course => {
      const matchesCat = (currentCategory === 'all' || course.category === currentCategory);
      const matchesSearch = course.title.toLowerCase().includes(searchQuery) ||
                            course.description.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      coursesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #111; margin-bottom: 8px;">No courses found</h3>
          <p style="color: #6C757D;">Try searching for different keywords or select a different category.</p>
        </div>
      `;
      return;
    }

    coursesGrid.innerHTML = filtered.map(course => `
      <div class="course-card">
        <div class="course-thumb-wrapper">
          <img src="${course.image}" alt="${course.title}" class="course-thumb-img"/>
          <span class="course-badge">${course.badge}</span>
        </div>
        <div class="course-body">
          <span class="course-category-tag">${course.categoryName}</span>
          <h3 class="course-card-title">${course.title}</h3>
          <p class="course-desc">${course.description}</p>
          <div class="course-meta-row">
            <span class="course-rating">★ ${course.rating}</span>
            <span class="course-students">👥 ${course.students} students</span>
          </div>
          <button class="btn-enroll-now" onclick="enrollCourse(${course.id}, '${course.title.replace(/'/g, "\\'")}')">
            Enroll Now
          </button>
        </div>
      </div>
    `).join('');
  }
});

function enrollCourse(courseId, courseTitle) {
  showToast(`Congratulations! You are enrolled in "${courseTitle}" 🎉`, 'success');
  if (typeof trackAnalyticsEvent === 'function') {
    trackAnalyticsEvent('course_enroll', { course_id: courseId, course_title: courseTitle });
  }
}
