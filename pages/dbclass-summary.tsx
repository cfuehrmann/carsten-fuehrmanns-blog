import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Picture } from "../components/media";
import { LinkedReference } from "../components/links";
import { StaticHtmlWithComments } from "../components/comments";
import { StaticHtmlProps } from "../components/static-html";

export default StaticHtmlWithComments;

export const meta = {
  title: "Stanford’s “Introduction to Databases”",
  date: "2013-03-24",
  description:
    'My experience with the Stanford online course "Introduction to Databases"',
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        I just finished an online course offered by the University of Stanford,
      </p>
      <LinkedReference target="https://cs.stanford.edu/people/widom/DB-mooc.html">
        Introduction to Databases
      </LinkedReference>
      <p>It was taught, not for the first time, by the delightful and heroic</p>
      <LinkedReference target="https://cs.stanford.edu/people/widom/">
        Prof. Jennifer Widom
      </LinkedReference>
      <p>
        and lasted from January 15 to March 23. This experience means a lot to
        me for reasons that will emerge below. This post is aimed at people who
        are interested in online learning in general, or in this particular
        course (which will probably be repeated). I am also writing this summary
        for myself, so feel free to skip passages which seem too biographical.
      </p>
      <Picture
        caption="Achievement unlocked: MOOC"
        fileName="stanford-databases-pulp"
        width={336}
        height={507}
        extension="jpg"
        hideCaption
      />
      <p>
        (Remark: If you are a creator of an online computer-science course,
        please have a look at this post’s section about automated exercises,
        gamification, and test-driven design.)
      </p>
      <h2>Number of students and their backgrounds</h2>
      <p>
        Early activities in the course forum showed that the students came from
        all continents. (In particular, I was happy to see people from all over
        Africa.) Students’ ages and backgrounds seemed to differ wildly.
        According to a statistics page at the end of the course, there were
        64127 registered students; 20836 turned in some work; 4854 received a
        “Statement of Accomplishment” (which can be seen as passing the course),
        and 1927 received the harder-to-obtain “Statement of Accomplishment With
        Distinction”. Some observers thought this meant a very high dropout
        rate, but I disagree: considering that this course is free, and signing
        up is trivial, I find it impressive that almost a quarter of the people
        who turned in some work passed.
      </p>
      <p>
        Prof. Widom also stated that there was a remarkable proportion of
        middle-aged IT professionals (like me) seeking to polish their skills.
      </p>
      <h2>My own motivation</h2>
      <p>My interest had several reasons:</p>
      <p>
        <ul>
          <li>
            In my job as software engineer, I often deal with databases. While
            learning-by-doing goes a long way, academic knowledge is still very
            beneficial.
          </li>
          <li>
            I have a university degree and a PhD in computer science, but I
            accidentally skirted around databases. That felt wrong.
          </li>
          <li>
            I am fascinated with computer aided learning, ever since I took a
            computerized French course in the mid-nineties and realized I could
            learn the language faster than I had learned other languages in
            school.
          </li>
          <li>
            In the early 2000s, I was a computer science lecturer myself,
            preparing lots of downloadable material (which is be still
            available, on this blog). If I still were a lecturer, I might be
            attempting to give an online course today.
          </li>
          <li>
            Finally, I deem it possible that online courses like the Stanford
            one are spearheading a revolution in academic teaching, and I want
            to watch it while it happens.
          </li>
        </ul>
      </p>

      <h2>How the course worked</h2>
      <p>
        On the course page, you can see the schedule straight away. There is a
        simple sign-up procedure where you create an account before tackling the
        course.
      </p>
      <h3>The lectures</h3>
      <p>
        The lectures are: Introduction, Relational Databases, XML Data, JSON
        Data, Relational Algebra, SQL, Relational Design Theory, Querying XML,
        UML, Indexes, Transactions, Constraints and Triggers, Views,
        Authorization, Recursion, Online Analytical Processing, NoSQL.
      </p>
      <p>They are to be followed over a period of ca. nine weeks.</p>
      <Picture
        caption="Prof. Widom in action"
        fileName="stanford-databases-lecture"
        width={840}
        height={480}
        extension="jpg"
      />

      <h3>The quizzes</h3>
      <p>
        Almost every lecture comes with a quiz that contributes to the student’s
        final score. The quizzes are multiple-choice, automatically graded, and
        very well designed in most cases. Each quiz has to be taken by a certain
        date, otherwise the score gets halved. Thus, the quizzes set the pace of
        the course.
      </p>
      <h3>The exercises</h3>
      <p>
        Many lectures have automatically graded “exercises”. Here the students
        are asked to write queries in SQL, Relational Algebra, Xquery, or XSLT.
        A query is typically run against a test database, and passes the
        automatic check if the result set is correct. (In some cases, cheating
        by hard-wiring the result is possible, but so cumbersome that one might
        as well supply a good solution.)
      </p>
      <p>
        There are simpler “core” exercises, and harder “challenge” exercises.
      </p>
      <p>I loved those exercises and found them almost addictive.</p>
      <h3>The exams</h3>
      <p>
        There was mid-term exam and a final exam. Both were multiple choice,
        open for three days, and once started, had to be finished within
        (generous) two hours.
      </p>
      <h3>The forum</h3>
      <p>
        The course also sports a forum, which was rather fun. In the beginning,
        students from all over the world introduced themselves. Then the
        interaction turned gradually towards frantic questioning and answering.
        Most answers were provided by students, and some by Prof. Widom’s
        assistant Garrett. Near the end of the course, there where many students
        thanking Prof. Widom and Garrett.
      </p>
      <h2>Certification?</h2>
      <p>
        At the end of the course, the student receives a “Statement of
        Accomplishment” showing how they performed. Unsurprisingly, this
        statement has no official character: because there was no face-to-face
        authentication, and no invigilation during tests, the student could have
        cheated to their heart’s content.
      </p>
      <p>
        The lack of an official certificate is lamentable, but obviously not the
        fault of this particular course. It is a problem that online learning in
        general still needs to address.
      </p>
      <h2>Time consumption and difficulty</h2>
      <p>
        Calculating the effort is tricky. One passes the course with a 50% score
        according to the scoring scheme linked above. With a good deal more
        effort, one can obtain a “distinction”. Because the quizzes and exams
        are well designed, a better score really means better understanding, so
        aiming for a good score is a worthy goal.
      </p>
      <p>
        I was probably an atypical student in this course: on the one hand, I
        had the privilege of an extremely strong academic education in computer
        science, at several universities, and that helped me a lot. On the other
        hand, my ambitions went way beyond the distinction boundary, and that
        cost me a lot of time. All in all, I spent ca. 130 hours, including
        everything: videos, quizzes, exercises, and exams plus preparation. That
        amounts to ca. 14 hours a week. A complete computer-science beginner may
        have to work hard to pass the course. By contrast, a professional
        software engineer would probably pass with moderate effort, and require
        maybe 10 hours a week for a distinction. If you want to get every detail
        right, it gets a lot harder.
      </p>
      <h2>Was it worth it?</h2>
      <p>
        After this course, I feel more confident when dealing with databases,
        despite the fact that I had a lot of previous experience. I also gained
        a much better understanding of the area of databases in the widest
        sense. Plus, I satisfied my curiosity about how it feels to partake in a
        top online university course.
      </p>
      <p>So yes, it was definitely worth it.</p>
      <h2>Do I want to take more such courses?</h2>
      <p>
        My enthusiasm may suggest that I generally recommend skilling up with
        online university courses. But things are not so simple. I, for example,
        am a quick learner, but also a quick forgetter, unless I apply lessons
        quickly. Luckily, I can quickly apply many lessons of this database
        course, and those will be cemented into my long-term memory. It could be
        very different with other courses, no matter how interesting. I will
        therefore remain focused on learning-by-doing, but keep my eyes open for
        interesting online courses I can quickly apply.
      </p>
      <p>
        Of course, dear reader, if your memory is better than mine, you may come
        to very different conclusions.
      </p>
      <h2>
        A key point: automated exercises, gamification, and test-driven design
      </h2>
      <p>
        The most interesting insight I gained was that there is a spectacular
        potential in automatically-checked exercises. The student writes an
        answer, and the system instantly verifies it.
      </p>
      <p>
        This verification is trivial for multiple-choice questions, but even
        there the student benefits from the immediacy of the feedback.
      </p>
      <p>
        By contrast, the verification performs heavy lifting when the system
        checks a whole computer program the student has written! Here the
        immediate feedback is extremely motivating. It introduces an element of{" "}
        <b>gamification</b>: the learning process can feel as addictive as a
        good (computer) game. (At least to those that like games.)
      </p>
      <p>
        Besides the benefits for the student, one should mention how automated
        exercises can reduce the per-student workload of teaching personnel.
      </p>
      <p>
        And there is another fascinating aspect of automated exercises:{" "}
        <b>test-driven design</b> is becoming increasingly prevalent in software
        engineering. It means that every piece of production code is preceded by
        unit tests. (A unit test is another piece of code, which pretends to be
        a user of the production code and checks if the latter behaves as
        expected.) Similarly to <b>unit tests</b>, the exercise-checker in
        Widom’s course checks the students’ code (queries written in SQL, XSLT,
        and the like), by inspecting the result set. So it is similar to a unit
        test, except that in typical unit test scenarios, the code is a
        non-declarative programming language like Java, and not a declarative
        one like SQL. So:{" "}
        <em>
          One could create a great programming course by introducing automatic
          exercises where the student has to beat unit tests! Knowing the
          extreme importance of test-driven design from first-hand experience, I
          am sure that this alley should be explored.
        </em>
      </p>
      <h2>Final words</h2>
      <p>
        Prof. Widom mentioned once that turning her existing database course
        into an online one was an incredible amount of work. Having been a
        lecturer myself, I can easily believe that. Her achievement makes me
        feel gratitude and admiration. She surely is not the first or only
        person to set up such a course; all such people are heroes to me.
      </p>
    </BlogPost>
  );
  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
