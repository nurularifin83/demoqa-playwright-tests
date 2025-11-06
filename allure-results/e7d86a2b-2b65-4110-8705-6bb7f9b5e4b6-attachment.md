# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - link "Fork me on GitHub":
      - /url: https://github.com/tourdedave/the-internet
      - img "Fork me on GitHub" [ref=e5] [cursor=pointer]
    - generic [ref=e7]:
      - heading "Status Codes" [level=3] [ref=e8]
      - paragraph [ref=e9]:
        - text: This page returned a 500 status code.
        - text: For a definition and common list of HTTP status codes, go
        - link "here" [ref=e10] [cursor=pointer]:
          - /url: /status_codes
  - generic [ref=e12]:
    - separator [ref=e13]
    - generic [ref=e14]:
      - text: Powered by
      - link "Elemental Selenium" [ref=e15] [cursor=pointer]:
        - /url: http://elementalselenium.com/
```