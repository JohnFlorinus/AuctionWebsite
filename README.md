<h2>🧠 Overview</h2>

<p>The website allows users to:</p>
<ul>
  <li>Create accounts & sign-in</li>
  <li>View a list of auctions</li>
  <li>Place bids</li>
  <li>See bid histories and item details</li>
</ul>

<hr>

<h2>🧰 Technologies Used</h2>

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td>React (Vite + Nginx)</td>
      <td>Modern UI for auction listings</td>
    </tr>
    <tr>
      <td>Backend</td>
      <td>.NET 8 Web API</td>
      <td>API with Dapper as Micro-ORM</td>
    </tr>
    <tr>
      <td>Database</td>
      <td>SQL Server</td>
      <td>Persistent relational data store</td>
    </tr>
    <tr>
      <td>DevOps</td>
      <td>Docker Compose</td>
      <td>Runs everything in isolated containers</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>🧨 Why This Project is “Bad”</h2>

<p>Things I was too lazy to fix/remake. I still showcase this repository on my profile because it showcases knowledge of many different technologies.</p>

<ul>
  <li>❌ <strong>No Entity Framework</strong> – Instead, it uses <strong>Dapper + stored procedures</strong>, making development generally slower.</li>
  <li>❌ <strong>Hardcoded secrets</strong> – Either use .gitignored configuration files or something like Azure Key Vault if cloud native.</li>
  <li>❌ <strong>No CI/CD pipeline</strong> – No build automation or cloud deployment yet.</li>
  <li>❌ <strong>frontend calls API with HTTP</strong> - Unencrypted and unsafe for production.</li>
</ul>

<hr>

<h2>🐳 Running the Project</h2>

<p>Make sure you have <strong>Docker</strong> and <strong>Docker Compose</strong> installed.</p>

<pre><code>git clone https://github.com/yourusername/AuctionApp.git
cd AuctionApp
docker compose up --build
</code></pre>

<p>Then open:</p>
<ul>
  <li>Frontend → <a href="http://localhost:80">http://localhost:80</a></li>
</ul>
