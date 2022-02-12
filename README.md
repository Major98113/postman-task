<h1>Postman-App</h1>

<p>To start app locally:</p>
<code>
     docker-compose up -d
</code>

<p>To stop app locally:</p>
<code>
     docker-compose down --rmi all
</code>
<br/>
<p>Also it is necessary to fill DB by data from next directory ( You can connect to DB after starting the App ):</p>
<code>https://github.com/Major98113/postman-task/blob/main/postman-service/migrations/dump.sql</code>
<br/><br/>
<p>
    App will work on 3000 port <br/>
    There are two endpoints: <br/>
    <code>
        GET http://localhost:3000
    </code>
    <br/>
    <code>
        GET http://localhost:8080/status/{emailId}
    </code>
</p>