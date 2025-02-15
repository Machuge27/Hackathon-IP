# Example dictionary
suggestions = {
    "Start": {
        "Hello": {
            "Student's portal.": [
                    "How to access the student's portal",
                    "How to log in to the student's portal",
                    "What do i need to access the students portal.",
                    "What is the students portal?!",
                ],
                "E-Learning.": [
                    "Unit registration..",
                    "How to sync my units.",
                    "what is the E-Learning(LMS).",
                    "Check for my current units.",
                ],
                "Curriculum offered.": [
                    "I'm sorry to hear that.",
                    "Oh no, that's not good.",
                    "I hope things get better.",
                    "I'm here if you need to talk.",
                ],
                "Exam bank.": [
                    "How can i access the Exams bank.",
                    "What is the exams bank."
                ],
                "E-Learning.": [
                    "I'm sorry to hear that.",
                    "Oh no, that's not good.",
                    "I hope things get better.",
                    "I'm here if you need to talk.",
                ],
                "Units registration.": [
                    "I'm sorry to hear that.",
                    "Oh no, that's not good.",
                    "I hope things get better.",
                    "I'm here if you need to talk.",
                ]
        },
        "Admission": {
            "Documents for student admission.": [
                "Where can I find admission documents?",
                "Sample Value 1 for Documents for student admission.",
                "Sample Value 2 for Documents for student admission.",
            ],
            "Admission window.": [
                "When is the admission period?",
                "Sample Value 1 for Admission window.",
                "Sample Value 2 for Admission window.",
            ],
            "How do get admitted.": [
                "How can I find admission documents?",
                "Sample Value 1 for How do get admitted.",
                "Sample Value 2 for How do get admitted.",
            ],
            "Admission requirements.": [
                "What are the minimum grades for admission?",
                "Sample Value 1 for Admission requirements.",
                "Sample Value 2 for Admission requirements.",
            ],
        },
        "Fees inquiries.": {
            "How can I pay my fees?": [
                "You can pay your fees online through our website.",
                "Visit the finance office for payment options.",
                "Bank transfer is also available for fee payments.",
                "Online payment portals are available for fee transactions.",
            ],
            "What are the tuition fees?": [
                "Tuition fees vary depending on the program. Please check our website or contact the finance office for details.",
                "For detailed information on tuition fees, please refer to our website or contact the finance department.",
                "Tuition fees differ based on the program and course load. Please check with the finance office for accurate details.",
                "The tuition fees are outlined in the student handbook. You can also inquire at the finance office for specifics.",
            ],
        },
        "Curriculum offered.": {
            "What courses are available?": [
                "We offer a wide range of courses across various disciplines. You can find the complete list on our website or in the course catalog.",
                "Our curriculum includes diverse courses designed to meet different interests and career goals. You can explore the offerings on our website or in the course catalog.",
                "We provide a comprehensive curriculum covering various subjects. Please refer to our website or course catalog for detailed information.",
                "Our curriculum encompasses a variety of courses tailored to different academic pursuits. Check our website or course catalog for specifics.",
            ]
        },
        "Units registration": {
            "How do I register for units?": [
                "Unit registration can be done online through the student portal.",
                "To register for units, log in to the student portal and follow the registration instructions. REMEMBER you must pay at least 75% of the fee of the current semester",
                "Unit registration is conducted online via the student portal. Log in to complete your registration.",
                "Access the student portal to register for units online.",
            ]
        },
        "Evaluation.": {
            "How are evaluations conducted?": [
                "Evaluations are typically conducted through a combination of exams, assignments, and projects. Check your course syllabus for specific evaluation methods.",
                "Evaluations include exams, quizzes, assignments, and projects. Refer to your course outline for evaluation criteria.",
                "Evaluation methods vary by course and may include exams, essays, presentations, and more. Consult your course materials for details.",
                "Evaluations are based on various factors such as exams, quizzes, assignments, and class participation. Review your course syllabus for evaluation details.",
            ]
        },
        "Examinations.": {
            "When are the examinations held?": [
                "Examination schedules vary by semester. Please refer to the academic calendar for specific dates.",
                "Examination dates are listed in the academic calendar. Check there for the latest information.",
                "The examination timetable is available on our website. Please consult it for your exam schedule.",
                "Examination dates and times can be found in the examination timetable. Check the schedule for details.",
            ]
        },
        "Hostels.": {
            "How can I apply for hostel accommodation?": [
                "You can apply for hostel accommodation through the accommodation office. Contact them for the application process and requirements.",
                "To apply for hostel accommodation, visit the accommodation office and complete the application form.",
                "Hostel accommodation applications are available through the accommodation office. Please inquire there for more information.",
                "Contact the accommodation office to apply for hostel accommodation. They will assist you with the application process.",
            ]
        },
        "Upcoming events.": {
            "What events are happening soon?": [
                "Stay updated on upcoming events by checking the events calendar on our website.",
                "Upcoming events are listed on our website's events calendar. Take a look to see what's happening!",
                "For information on upcoming events, visit our website or check the events calendar.",
                "The events calendar on our website provides details on upcoming events. Check there for more information.",
            ]
        },
        "School history.": {
            "What is the history of our school?": [
                "Our school has a rich history dating back to its founding. You can learn more about our history on our website or in our archives.",
                "Our school has a long and storied history. Visit our website for an overview or contact the school archives for more detailed information.",
                "Our school's history is filled with achievements and milestones. Explore our website or archives to learn more.",
                "The history of our school is documented in our archives and on our website. Feel free to explore for more information.",
            ]
        },
        "School location.": {
            "Where is our school located?": [
                "Our school is located at [Insert Address Here]. You can find directions on our website or contact us for assistance.",
                "Our school is situated in [Insert City or Area Here]. For detailed directions, visit our website or contact our office.",
                "You can find our school at [Insert Location Here]. Visit our website for directions or contact us if you need assistance.",
                "Our school is conveniently located in [Insert City or Area Here]. Directions can be found on our website or by contacting our office.",
            ]
        },
    }
}


def accept_each_level(dictionary, level=0):
    for key, value in dictionary.items():
        print(f"Level {level}: Key: {key}")
        if isinstance(value, dict):
            accept_each_level(value, level + 1)
        else:
            print(f"Level {level}: Value 1: {value[0]}")
            if len(value) > 1:
                print(f"Level {level}: Value 2: {value[1]}")


def suggestionsGenerator(
    input_str, dictionary, partial_matching=False, case_sensitive=False
):
    if dictionary is None:
        dictionary = suggestions
    words = input_str.split()
    matches = []
    possible_suggestions = []
    results = []

    def recursive_search(d, words, path=""):
        for key, value in d.items():
            match_count = sum(
                1
                for word in words
                if (partial_matching and word.lower() in key.lower())
                or (
                    not partial_matching
                    and (word.lower() in key.lower() or word.lower() == key.lower())
                )
            )
            if match_count > 0:
                # print("MAtch:",key)
                # print("Values:",value)
                matches.append(key)
                possible_suggestions.append(value)
                results.append((path + key, value, match_count))
            if isinstance(value, dict):
                recursive_search(value, words, path + key + " -> ")

    recursive_search(dictionary, words)
    print(f"Number of matches:{len(results)}")
    return (
        matches,
        possible_suggestions,
        sorted(results, key=lambda x: x[2], reverse=True)
    )  


def main():
    # Call the function to accept each level of the dictionary
    # accept_each_level(suggestions)

    while True:
        # Take user input
        user_input = input("Enter your query: ")

        # Option to toggle partial matching
        # partial_match_input = input("Enable partial word matching? (yes/no): ").lower()
        partial_matching = True  # partial_match_input == "yes"

        # Option to toggle case sensitivity
        # case_sensitive_input = input("Enable case sensitivity? (yes/no): ").lower()
        case_sensitive = True  # case_sensitive_input == "yes"

        # Search the dictionary for matching values
        matches, possible_suggestions, matching_values = suggestionsGenerator(
            user_input,
            suggestions,
            partial_matching=partial_matching,
            case_sensitive=case_sensitive,
        )

        if matching_values:
            print("Matching values found:")
            # print("possible_suggestions :", possible_suggestions)
            for key, value, count in matching_values:
                print(f"Path: {key} (Matches: {count})")
                if isinstance(value, list):
                    for item in value:
                        print(f"  - {item}")
                elif isinstance(value, dict):
                    for sub_key, sub_value in value.items():
                        print(f"  Sub-Key: {sub_key}")
                        if isinstance(sub_value, list):
                            for item in sub_value:
                                print(f"    - {item}")
            for match in matches:
                print("MAtch:", match)
            for ps in possible_suggestions:
                # print("Possible Suggestion:", ps)
                for key in ps:
                    print("Possible Suggestion:", key)
        else:
            print("No matching values found.")


# user_input = "account"
if __name__ == '__main__':
    # suggestionsGenerator(user_input, suggestions, partial_matching=partial_matching, case_sensitive=case_sensitive)
    main()
