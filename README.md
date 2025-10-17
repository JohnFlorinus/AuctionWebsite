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

<h2>🧨 Why This Project Is Bad</h2>

<p>
This project is a mix of my previous assignments at Jensen Yrkeshögskola and has multiple bad implementations.
Most issues can be fixed very easily but I would rather spend my time on my other projects, plus migrating ORM and stored procedures is a pain in the ass.
Still, I keep it on my GitHub profile because it demonstrates hands-on experience with a wide range of technologies.
</p>

<ul>
  <li>❌ <strong>No Entity Framework</strong> – Uses <strong>Dapper + stored procedures</strong> instead, which makes development more tedious.</li>
  <li>❌ <strong>Hardcoded secrets</strong> – Should really be stored in a <code>.gitignored</code> configuration file or managed through a secure service like <strong>Azure Key Vault</strong>.</li>
  <li>❌ <strong>No CI/CD pipeline included</strong> – For easy future development and deployments.</li>
  <li>❌ <strong>Frontend calls the API over HTTP</strong> – Unencrypted and unsafe for production environments.</li>
  <li>❌ <strong>Few unit tests</strong> – The unit tests would do little to prevent mishap deployments as of now.</li>
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
