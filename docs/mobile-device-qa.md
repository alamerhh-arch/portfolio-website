# Real-device mobile QA

Run this checklist on the deployed pull-request branch or a temporary preview URL. Record the device, OS, browser, result, and evidence in the pull request before merging.

## Required device matrix

| Device | Browser | Viewport class | Required |
|---|---|---:|---:|
| Current iPhone | Safari | narrow | Yes |
| Older/smaller iPhone | Safari | narrow | Yes |
| Current Android phone | Chrome | narrow | Yes |
| Android tablet or iPad | Chrome/Safari | medium | Recommended |

## Test cases

- Open the homepage on cellular data and confirm images do not move surrounding text while loading.
- Open the navigation, switch English/Arabic twice, and confirm direction, alignment, labels, and scroll position.
- Open the Projects page, apply every filter, open a project, and use the gallery with touch gestures/buttons.
- Rotate portrait to landscape and back; confirm no horizontal overflow or clipped headings.
- Open a certificate lightbox, move next/previous, close it, and confirm focus returns to the originating card.
- Test the email, telephone, LinkedIn, CV, YouTube, and back-navigation links.
- Check 200% text zoom and increased system font size.
- Confirm every primary control has a comfortable touch target and visible pressed/focus state.

## Merge requirement

Do not mark the pull request ready to merge until the three required phone rows have a recorded pass. Automated checks complement this test but do not replace physical-device verification.
