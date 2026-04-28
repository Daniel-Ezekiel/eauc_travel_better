# 🌐 Website Integration Guide — For EAUC Web Team

← [Back to README](../README.md)

The tool is hosted as a standalone web application and can be embedded directly into any page on the EAUC website using an HTML `<iframe>`.

---

## Embedding the Tool

Switch your page editor to **HTML / Code / Text** mode (not the Visual editor), then paste the following:

```html
<iframe
  src="https://eauc-travel-better.vercel.app"
  width="100%"
  height="900px"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
  title="EAUC Air Travel Justification Tool"
  loading="lazy">
</iframe>
```

---

## Customisation Notes

| Attribute | Description |
|---|---|
| `src` | The live URL of the tool — update this if the hosting URL ever changes |
| `height` | Adjust as needed to fit your page layout (e.g. `800px`, `1000px`) |
| `title` | **Required** for screen reader accessibility — do not remove |
| `loading="lazy"` | Improves page load performance; safe to keep |

---

## Notes on Compatibility

- The tool is a fully self-contained Single Page Application (SPA). It does not require any cookies, authentication, or third-party scripts from the embedding page.
- It is responsive and will adapt to the width of the `<iframe>` container automatically.
- If your CMS strips inline `style` attributes, apply the border/shadow via a CSS class on a wrapping `<div>` instead.
