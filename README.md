# Iskra Coaching

Static one-page website (plain HTML + CSS in a single file, no build step, no CDN framework).
Files: `index.html` (home), `resources.html` (resources page) and `questionnaire.html` (pre-coaching questionnaire).

## Deploy with GitHub Pages

1. Create a new repository on GitHub (e.g. `iskra-coaching`).
2. Upload `index.html` and this `README.md` to the repository root
   (**Add file → Upload files**, then **Commit changes**).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose branch `main` and folder `/ (root)`, then **Save**.
5. After a minute or two the site is live at
   `https://<your-username>.github.io/iskra-coaching/`.

## Before going live

- **Contact form:** it is not wired up yet. Create a free endpoint at
  [Formspree](https://formspree.io) (or Web3Forms / Getform), set the form's
  `action` in `index.html` to that URL, and the placeholder alert turns off automatically.
- **Portrait:** add your photo as `images/irena.jpg` (square crop works best). Until then,
  a gold monogram is shown in its place.
- **Links:** update the Calendly link and the LinkedIn / Twitter / email icons in the footer.
- **Legal pages:** Privacy Policy and Terms of Service currently point to `#`.

## Custom domain (optional)

Add a file named `CNAME` containing your domain (e.g. `iskracoaching.com`) and configure
DNS as described in GitHub's Pages docs.

## Questionnaire form
`questionnaire.html` has its own form. Like the inquiry form on the home page, set its `action="#"` to your
Formspree / Web3Forms endpoint before launch.
