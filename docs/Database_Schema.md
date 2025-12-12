# Database Schema

Firebase (Auth + Firestore)
- users { id, email, displayName, language, badges[] }
- posts { id, userId, mediaUrl, location, priceRange, popularity, safetyRating, tags[], createdAt }
- plans { id, userId, input, result, createdAt }

SQL (Postgres)
- subscriptions { id, userId, stripeSubId, status, plan, createdAt }
- affiliates_clicks { id, userId, partner, link, createdAt }

