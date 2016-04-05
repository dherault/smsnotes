# SMSNotes

WIP :)

### License

Apache-2.0

### Configuration notes

#### S3
- Make sure to make 'list' permission available to everyone.
- redirect smsnotes.com to www.smsnotes.com

#### Cloudfront
- Enable compression
- Set custom error response setting: 400, ttl 0, yes, /index.html, 200

### Update notes

#### Normalize.css
- Add 'Roboto' to definition of html.font-family

### Memorable bugs list

- Carriage return from Nexmo: https://forums.aws.amazon.com/thread.jspa?threadID=225001