/**
 * THE ODYSSEY - FULL-SCREEN CASE STUDY MODAL
 * 6-Chapter Editorial Presentation: Problem, Idea, Process, Product, Result, Links
 * Interactive UI simulator & Wireframe Architecture for Cardy
 */

import { portfolioData } from '../data/portfolioData.js';

export class CaseStudyModal {
  constructor() {
    this.modalEl = document.getElementById('case-study-modal');
    this.modalContentEl = document.getElementById('modal-dynamic-content');
    this.closeBtn = document.getElementById('modal-close-btn');

    this.bindEvents();
  }

  bindEvents() {
    // Open quest trigger buttons
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-quest]');
      if (trigger) {
        e.preventDefault();
        const questId = trigger.getAttribute('data-open-quest');
        this.open(questId);
      }
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) {
          this.close();
        }
      });
    }

    // Keyboard ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl && this.modalEl.classList.contains('open')) {
        this.close();
      }
    });
  }

  open(questId) {
    const quest = portfolioData.quests.find(q => q.id === questId);
    if (!quest || !this.modalContentEl) return;

    this.modalContentEl.innerHTML = this.renderContent(quest);
    this.modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Scroll modal to top
    this.modalEl.scrollTop = 0;

    // Attach any interactive mockup handlers if Cardy
    if (questId === 'cardy') {
      this.initCardyInteractiveDemo();
    }
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderContent(quest) {
    const isCardy = quest.id === 'cardy';
    const isResearch = quest.id === 'investor-sentiment';

    return `
      <div class="modal-inner-container">
        <!-- Header Section -->
        <header class="modal-header-section">
          <div class="chapter-number">DESTINATION DOSSIER // QUEST: ${quest.id.toUpperCase()}</div>
          <h1 class="section-headline">${quest.title}</h1>
          <p class="section-subheadline">${quest.tagline}</p>
          <div class="quest-tag-row">
            ${quest.tags.map(tag => `<span class="archival-tag">${tag}</span>`).join('')}
          </div>
        </header>

        <!-- Chapter 01: The Problem -->
        <section class="modal-chapter-block">
          <div class="modal-chapter-tag">CHAPTER 01</div>
          <h2 class="modal-chapter-title">THE PROBLEM</h2>
          <div class="modal-prose">
            <p>${quest.caseStudy.problem}</p>
          </div>
        </section>

        <!-- Chapter 02: The Idea -->
        <section class="modal-chapter-block">
          <div class="modal-chapter-tag">CHAPTER 02</div>
          <h2 class="modal-chapter-title">THE IDEA</h2>
          <div class="modal-prose">
            <p>${quest.caseStudy.idea}</p>
          </div>
        </section>

        <!-- Chapter 03: The Process -->
        <section class="modal-chapter-block">
          <div class="modal-chapter-tag">CHAPTER 03</div>
          <h2 class="modal-chapter-title">THE PROCESS</h2>
          <div class="modal-prose">
            <p>${quest.caseStudy.process}</p>
          </div>
        </section>

        <!-- Chapter 04: The Product -->
        <section class="modal-chapter-block">
          <div class="modal-chapter-tag">CHAPTER 04</div>
          <h2 class="modal-chapter-title">THE PRODUCT</h2>
          <div class="modal-prose">
            <p>${quest.caseStudy.product}</p>
          </div>

          ${isCardy ? this.renderCardyMockupArea() : ''}
          ${isResearch ? this.renderResearchChartArea() : ''}
        </section>

        <!-- Chapter 05: The Result -->
        <section class="modal-chapter-block">
          <div class="modal-chapter-tag">CHAPTER 05</div>
          <h2 class="modal-chapter-title">THE RESULT</h2>
          <div class="modal-prose">
            <p>${quest.caseStudy.result}</p>
          </div>
        </section>

        <!-- Chapter 06: Links -->
        <section class="modal-chapter-block" style="border-top: 1px solid var(--border-subtle); padding-top: 2.5rem;">
          <div class="modal-chapter-tag">CHAPTER 06</div>
          <h2 class="modal-chapter-title">EXPEDITION LOGS & ACCESS</h2>
          <div class="modal-action-row">
            <a href="${quest.caseStudy.links.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn-cinematic">
              LIVE DEMO →
            </a>
            <a href="${quest.caseStudy.links.github}" target="_blank" rel="noopener noreferrer" class="btn-cinematic btn-cinematic-secondary">
              GITHUB →
            </a>
          </div>
        </section>
      </div>
    `;
  }

  renderCardyMockupArea() {
    return `
      <div style="margin-top: 2.5rem; background: #071520; border: 1px solid var(--border-gold); padding: clamp(1.5rem, 3vw, 2.5rem);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.2em; color: var(--accent-gold);">
            CARDY INTERACTIVE SIMULATOR // REWARD & CASHBACK ENGINE
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
            V1.0.4 PROTOTYPE
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          <!-- Card Visualizer -->
          <div>
            <div id="demo-card-preview" style="background: linear-gradient(135deg, #132D3B 0%, #07131C 100%); border: 1px solid var(--border-gold-bright); border-radius: 12px; padding: 2rem; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
                <div style="width: 44px; height: 32px; background: linear-gradient(135deg, #B89B5E, #D4BA7D); border-radius: 6px;"></div>
                <div id="demo-bank-tag" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-gold); letter-spacing: 0.15em;">VPBANK STEPUP</div>
              </div>
              <div id="demo-card-number" style="font-family: var(--font-mono); font-size: 1.1rem; letter-spacing: 0.25em; color: #F2EBDD; margin-bottom: 1.5rem;">
                •••• •••• •••• 8826
              </div>
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">CARDHOLDER</div>
                  <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #F2EBDD; letter-spacing: 0.1em;">PHAN THI THU TRANG</div>
                </div>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">REWARD RATE</div>
                  <div id="demo-reward-rate" style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--accent-gold-light); font-weight: 700;">15.0%</div>
                </div>
              </div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 1rem;">
              SELECT REWARD CATEGORY BELOW TO RECALIBRATE
            </div>
          </div>

          <!-- Controls & Feature Breakdown -->
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.15em; color: var(--accent-slate-light); margin-bottom: 0.75rem;">
                SPENDING PATTERN OPTIMIZER
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                <button class="cardy-demo-tab-btn active" data-category="online" style="padding: 0.5rem 1rem; font-family: var(--font-mono); font-size: 0.75rem; background: var(--accent-gold); color: #07131C; border: none; cursor: pointer;">ONLINE & E-COMMERCE</button>
                <button class="cardy-demo-tab-btn" data-category="dining" style="padding: 0.5rem 1rem; font-family: var(--font-mono); font-size: 0.75rem; background: rgba(14,36,48,0.8); color: var(--text-secondary); border: 1px solid var(--border-medium); cursor: pointer;">CULINARY & TRAVEL</button>
                <button class="cardy-demo-tab-btn" data-category="cashback" style="padding: 0.5rem 1rem; font-family: var(--font-mono); font-size: 0.75rem; background: rgba(14,36,48,0.8); color: var(--text-secondary); border: 1px solid var(--border-medium); cursor: pointer;">EVERYDAY CASHBACK</button>
              </div>

              <div id="demo-feature-detail" style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary); background: rgba(7, 19, 28, 0.6); padding: 1.25rem; border-left: 2px solid var(--accent-gold);">
                <strong>Optimization Algorithm Result:</strong> Recommends maximum 15% cashback on Shopee, Grab, and digital advertising expenditure. Auto-waives annual fee upon 36M VND annual spend threshold.
              </div>
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
              <div style="flex: 1; padding: 0.75rem; background: rgba(14, 36, 48, 0.5); border: 1px solid var(--border-subtle);">
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">ANNUAL SAVINGS</div>
                <div id="demo-annual-savings" style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--accent-gold); font-weight: 600;">7,200,000 VND</div>
              </div>
              <div style="flex: 1; padding: 0.75rem; background: rgba(14, 36, 48, 0.5); border: 1px solid var(--border-subtle);">
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">FIT SCORE</div>
                <div id="demo-fit-score" style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--text-primary); font-weight: 600;">98.4 / 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderResearchChartArea() {
    return `
      <div style="margin-top: 2.5rem; background: #071520; border: 1px solid var(--border-gold); padding: clamp(1.5rem, 3vw, 2.5rem);">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.2em; color: var(--accent-gold); margin-bottom: 1rem;">
          PCA EIGENVECTOR DECOMPOSITION & SENTIMENT MODEL
        </div>
        <div style="background: rgba(7,19,28,0.7); padding: 1.5rem; border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-gold-light); margin-bottom: 1.5rem; overflow-x: auto;">
          ISI_t = 0.428 × TURN_t + 0.381 × ADV_DEC_t + 0.362 × DVOL_t + 0.315 × VOL_t - 0.284 × SPREAD_t
        </div>
        <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">
          First Principal Component captures <strong>62.4% of total market variance</strong> across 3,000+ observations on the Ho Chi Minh Stock Exchange (HOSE). Demonstrates strong predictive capacity for negative skewness in stock returns during market inflection points.
        </div>
      </div>
    `;
  }

  initCardyInteractiveDemo() {
    const tabs = document.querySelectorAll('.cardy-demo-tab-btn');
    const bankTag = document.getElementById('demo-bank-tag');
    const rewardRate = document.getElementById('demo-reward-rate');
    const featureDetail = document.getElementById('demo-feature-detail');
    const annualSavings = document.getElementById('demo-annual-savings');
    const fitScore = document.getElementById('demo-fit-score');

    const config = {
      online: {
        bank: 'VPBANK STEPUP',
        rate: '15.0%',
        detail: '<strong>Optimization Algorithm Result:</strong> Recommends maximum 15% cashback on Shopee, Grab, and digital advertising expenditure. Auto-waives annual fee upon 36M VND annual spend threshold.',
        savings: '7,200,000 VND',
        score: '98.4 / 100'
      },
      dining: {
        bank: 'HSBC PREMIER WORLD',
        rate: '4X MILES',
        detail: '<strong>Optimization Algorithm Result:</strong> Premium culinary cashback of 6% at five-star dining establishments and accelerated 4x Lotusmiles conversion on international hotel bookings.',
        savings: '11,400,000 VND',
        score: '95.1 / 100'
      },
      cashback: {
        bank: 'TECHCOMBANK SPARK',
        rate: '5.0%',
        detail: '<strong>Optimization Algorithm Result:</strong> Flat uncapped 5% cashback on utilities, healthcare, supermarkets, and education tuition fees across Vietnam.',
        savings: '4,800,000 VND',
        score: '93.7 / 100'
      }
    };

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => {
          b.style.background = 'rgba(14,36,48,0.8)';
          b.style.color = 'var(--text-secondary)';
          b.classList.remove('active');
        });
        btn.style.background = 'var(--accent-gold)';
        btn.style.color = '#07131C';
        btn.classList.add('active');

        const cat = btn.getAttribute('data-category');
        const data = config[cat];
        if (data) {
          if (bankTag) bankTag.textContent = data.bank;
          if (rewardRate) rewardRate.textContent = data.rate;
          if (featureDetail) featureDetail.innerHTML = data.detail;
          if (annualSavings) annualSavings.textContent = data.savings;
          if (fitScore) fitScore.textContent = data.score;
        }
      });
    });
  }
}
