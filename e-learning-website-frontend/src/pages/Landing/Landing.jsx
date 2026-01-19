import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </div>
  );
}

/* ---------- HERO ---------- */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Master the Future</h1>
      <p className={styles.subtitle}>
        Learn skills that matter. Track progress. Grow faster.
      </p>

      <Link to="/courses" className={styles.primaryBtn}>
        Explore Courses
      </Link>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className={styles.card}>Learn at your pace</div>
      <div className={styles.card}>Track your progress</div>
      <div className={styles.card}>Admin-curated courses</div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTASection() {
  return (
    <section className={styles.cta}>
      <h2>Start your learning journey today</h2>
      <Link to="/signup" className={styles.secondaryBtn}>
        Get Started
      </Link>
    </section>
  );
}
